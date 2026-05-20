import { Server } from 'socket.io';
import { store } from './state.js';
import { analytics } from './analytics.js';
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
      const user = store.registerUser(data.name, data.role, socket.id, data.icon);
      if (user) {
        callback(user);
        io.emit('user:registered', user);
        analytics.userRegistered({ user_id: user.id, user_name: user.name, role: user.role, socket_id: user.socketId });
      } else {
        callback(null as unknown as Parameters<typeof callback>[0]);
      }
    });

    socket.on('user:remove-role', (data, callback) => {
      const state = store.getState();
      const affectedTeams = state.teams.filter((t) => t.members.includes(data.userId));
      for (const team of affectedTeams) {
        const updated = store.leaveTeam(team.id, data.userId);
        if (updated) io.emit('team:updated', updated);
      }
      const user = store.removeUser(data.userId);
      if (user) {
        callback(true);
        io.emit('user:removed', user.id);
      } else {
        callback(false);
      }
    });

    socket.on('team:create', (data, callback) => {
      const team = store.createTeam(data.name, data.icon, data.createdBy);
      if (team) {
        callback(team);
        io.emit('team:created', team);
        analytics.teamCreated({ team_id: team.id, team_name: team.name, created_by: team.createdBy });
      } else {
        callback(null);
      }
    });

    socket.on('team:join', (data, callback) => {
      const team = store.joinTeam(data.teamId, data.userId);
      if (team) {
        callback(team);
        io.emit('team:updated', team);
        analytics.teamJoined({ team_id: team.id, user_id: data.userId });
      } else {
        callback(null);
      }
    });

    socket.on('team:leave', (data, callback) => {
      const team = store.leaveTeam(data.teamId, data.userId);
      if (team) {
        callback(true);
        io.emit('team:updated', team);
        analytics.teamLeft({ team_id: team.id, user_id: data.userId });
      } else {
        callback(false);
      }
    });

    socket.on('team:approve-entry', (data, callback) => {
      const team = store.approveEntry(data.teamId);
      if (team) {
        callback(team);
        io.emit('team:updated', team);
        analytics.teamEntryApproved({ team_id: team.id, approved_entries: team.approvedCount });
      } else {
        callback(null);
      }
    });

    socket.on('team:reject-entry', (data) => {
      const team = store.rejectEntry(data.teamId);
      if (team) {
        io.emit('team:updated', team);
        analytics.teamEntryRejected({ team_id: team.id });
      }
    });

    socket.on('team:confer-ability', (data, callback) => {
      const team = store.conferAbility(data.teamId, data.ability);
      if (team) {
        callback(team);
        io.emit('team:updated', team);
        analytics.teamAbilityConferred({ team_id: team.id, ability: data.ability });
      } else {
        callback(null);
      }
    });

    socket.on('timer:create', (data, callback) => {
      const timer = store.createTimer(data.label, data.duration, data.createdBy);
      callback(timer);
      io.emit('timer:created', timer);
      analytics.timerCreated({ timer_id: timer.id, label: timer.label, duration: timer.duration, created_by: timer.createdBy });
    });

    socket.on('timer:start', (data) => {
      const timer = store.updateTimer(data.timerId, { isRunning: true });
      if (timer) {
        io.emit('timer:updated', timer);
        startTimerInterval(io, timer);
        analytics.timerStarted({ timer_id: timer.id });
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
        analytics.timerStopped({ timer_id: timer.id });
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
      analytics.gameReset();
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      const user = store.removeUserBySocket(socket.id);
      if (user) {
        analytics.userDisconnected({ user_id: user.id, socket_id: socket.id });
        const state = store.getState();
        const affectedTeams = state.teams.filter((t) => t.members.includes(user.id));
        for (const team of affectedTeams) {
          const updated = store.leaveTeam(team.id, user.id);
          if (updated) io.emit('team:updated', updated);
        }
        io.emit('user:removed', user.id);
      }
    });
  });
}
