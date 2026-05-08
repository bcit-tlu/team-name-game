import { Server } from 'socket.io';
import { store } from './state.js';
import type { ClientToServerEvents, ServerToClientEvents, NukeTimer } from './types.js';

type GameIO = Server<ClientToServerEvents, ServerToClientEvents>;

const timerIntervals = new Map<string, NodeJS.Timeout>();

function startTimerInterval(io: GameIO, timer: NukeTimer): void {
  if (timerIntervals.has(timer.id)) return;

  const interval = setInterval(() => {
    const t = store.getTimer(timer.id);
    if (!t || !t.isRunning) {
      clearInterval(interval);
      timerIntervals.delete(timer.id);
      return;
    }
    t.remaining = Math.max(0, t.remaining - 1);
    if (t.remaining <= 0) {
      t.isRunning = false;
      clearInterval(interval);
      timerIntervals.delete(timer.id);
    }
    io.emit('timer:updated', t);
  }, 1000);

  timerIntervals.set(timer.id, interval);
}

export function setupSocketHandlers(io: GameIO): void {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.emit('state:full', store.getState());

    socket.on('user:register', (data, callback) => {
      const user = store.registerUser(data.name, data.role, socket.id);
      callback(user);
      io.emit('user:registered', user);
    });

    socket.on('team:create', (data, callback) => {
      const team = store.createTeam(data.name, data.icon, data.createdBy);
      callback(team);
      io.emit('team:created', team);
    });

    socket.on('team:approve-entry', (data, callback) => {
      const team = store.approveEntry(data.teamId);
      if (team) {
        callback(team);
        io.emit('team:updated', team);
      } else {
        callback(null);
      }
    });

    socket.on('team:reject-entry', () => {
      // Reject does nothing to state per requirements
    });

    socket.on('team:confer-ability', (data, callback) => {
      const team = store.conferAbility(data.teamId, data.ability);
      if (team) {
        callback(team);
        io.emit('team:updated', team);
      } else {
        callback(null);
      }
    });

    socket.on('timer:create', (data, callback) => {
      const timer = store.createTimer(data.label, data.duration, data.createdBy);
      callback(timer);
      io.emit('timer:created', timer);
    });

    socket.on('timer:start', (data) => {
      const timer = store.updateTimer(data.timerId, { isRunning: true });
      if (timer) {
        io.emit('timer:updated', timer);
        startTimerInterval(io, timer);
      }
    });

    socket.on('timer:stop', (data) => {
      const timer = store.updateTimer(data.timerId, { isRunning: false });
      if (timer) {
        const interval = timerIntervals.get(timer.id);
        if (interval) {
          clearInterval(interval);
          timerIntervals.delete(timer.id);
        }
        io.emit('timer:updated', timer);
      }
    });

    socket.on('timer:reset', (data) => {
      const existing = store.getTimer(data.timerId);
      if (existing) {
        const interval = timerIntervals.get(existing.id);
        if (interval) {
          clearInterval(interval);
          timerIntervals.delete(existing.id);
        }
        const timer = store.updateTimer(data.timerId, {
          remaining: existing.duration,
          isRunning: false,
        });
        if (timer) io.emit('timer:updated', timer);
      }
    });

    socket.on('timer:update-label', (data) => {
      const timer = store.updateTimer(data.timerId, { label: data.label });
      if (timer) io.emit('timer:updated', timer);
    });

    socket.on('game:reset', () => {
      for (const [id, interval] of timerIntervals) {
        clearInterval(interval);
        timerIntervals.delete(id);
      }
      store.reset();
      io.emit('game:reset');
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      const user = store.removeUserBySocket(socket.id);
      if (user) {
        io.emit('user:removed', user.id);
      }
    });
  });
}
