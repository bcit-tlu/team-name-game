import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { useSocket } from './SocketContext';

export type Role = 'team-member' | 'adjudicator' | 'timer' | 'weaver';
export type AbilityType = 'star' | 'nuke' | 'interceptor' | 'meh';

export interface User {
  id: string;
  name: string;
  role: Role;
  socketId: string;
}

export interface Team {
  id: string;
  name: string;
  icon: string;
  members: string[];
  entriesUntilAbility: number;
  abilitiesEarned: AbilityType[];
  createdBy: string;
}

export interface NukeTimer {
  id: string;
  label: string;
  duration: number;
  remaining: number;
  isRunning: boolean;
  createdBy: string;
}

interface GameState {
  users: User[];
  teams: Team[];
  timers: NukeTimer[];
  currentUser: User | null;
}

type GameAction =
  | { type: 'SET_FULL_STATE'; payload: { users: User[]; teams: Team[]; timers: NukeTimer[] } }
  | { type: 'SET_CURRENT_USER'; payload: User }
  | { type: 'USER_REGISTERED'; payload: User }
  | { type: 'USER_REMOVED'; payload: string }
  | { type: 'TEAM_CREATED'; payload: Team }
  | { type: 'TEAM_UPDATED'; payload: Team }
  | { type: 'TEAM_REMOVED'; payload: string }
  | { type: 'TIMER_CREATED'; payload: NukeTimer }
  | { type: 'TIMER_UPDATED'; payload: NukeTimer }
  | { type: 'TIMER_REMOVED'; payload: string }
  | { type: 'GAME_RESET' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_FULL_STATE':
      return { ...state, ...action.payload };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'USER_REGISTERED':
      return { ...state, users: [...state.users, action.payload] };
    case 'USER_REMOVED':
      return { ...state, users: state.users.filter((u) => u.id !== action.payload) };
    case 'TEAM_CREATED':
      return { ...state, teams: [...state.teams, action.payload] };
    case 'TEAM_UPDATED':
      return {
        ...state,
        teams: state.teams.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'TEAM_REMOVED':
      return { ...state, teams: state.teams.filter((t) => t.id !== action.payload) };
    case 'TIMER_CREATED':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'TIMER_UPDATED':
      return {
        ...state,
        timers: state.timers.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'TIMER_REMOVED':
      return { ...state, timers: state.timers.filter((t) => t.id !== action.payload) };
    case 'GAME_RESET':
      return { users: [], teams: [], timers: [], currentUser: null };
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  registerUser: (name: string, role: Role) => Promise<User>;
  createTeam: (name: string, icon: string) => Promise<Team>;
  approveEntry: (teamId: string) => Promise<Team>;
  rejectEntry: (teamId: string) => void;
  conferAbility: (teamId: string, ability: AbilityType) => Promise<Team>;
  createTimer: (label: string, duration: number) => Promise<NukeTimer>;
  startTimer: (timerId: string) => void;
  stopTimer: (timerId: string) => void;
  resetTimer: (timerId: string) => void;
  updateTimerLabel: (timerId: string, label: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket();
  const [state, dispatch] = useReducer(gameReducer, {
    users: [],
    teams: [],
    timers: [],
    currentUser: null,
  });

  useEffect(() => {
    if (!socket) return;

    socket.on('state:full', (fullState) => {
      dispatch({ type: 'SET_FULL_STATE', payload: fullState });
    });

    socket.on('user:registered', (user) => {
      dispatch({ type: 'USER_REGISTERED', payload: user });
    });

    socket.on('user:removed', (userId) => {
      dispatch({ type: 'USER_REMOVED', payload: userId });
    });

    socket.on('team:created', (team) => {
      dispatch({ type: 'TEAM_CREATED', payload: team });
    });

    socket.on('team:updated', (team) => {
      dispatch({ type: 'TEAM_UPDATED', payload: team });
    });

    socket.on('team:removed', (teamId) => {
      dispatch({ type: 'TEAM_REMOVED', payload: teamId });
    });

    socket.on('timer:created', (timer) => {
      dispatch({ type: 'TIMER_CREATED', payload: timer });
    });

    socket.on('timer:updated', (timer) => {
      dispatch({ type: 'TIMER_UPDATED', payload: timer });
    });

    socket.on('timer:removed', (timerId) => {
      dispatch({ type: 'TIMER_REMOVED', payload: timerId });
    });

    socket.on('game:reset', () => {
      dispatch({ type: 'GAME_RESET' });
    });

    return () => {
      socket.off('state:full');
      socket.off('user:registered');
      socket.off('user:removed');
      socket.off('team:created');
      socket.off('team:updated');
      socket.off('team:removed');
      socket.off('timer:created');
      socket.off('timer:updated');
      socket.off('timer:removed');
      socket.off('game:reset');
    };
  }, [socket]);

  const registerUser = useCallback(
    (name: string, role: Role): Promise<User> => {
      return new Promise((resolve, reject) => {
        if (!socket) return reject(new Error('Socket not connected'));
        socket.emit('user:register', { name, role }, (user: User) => {
          dispatch({ type: 'SET_CURRENT_USER', payload: user });
          resolve(user);
        });
      });
    },
    [socket],
  );

  const createTeam = useCallback(
    (name: string, icon: string): Promise<Team> => {
      return new Promise((resolve, reject) => {
        if (!socket) return reject(new Error('Socket not connected'));
        socket.emit(
          'team:create',
          { name, icon, createdBy: state.currentUser?.id || '' },
          (team: Team) => resolve(team),
        );
      });
    },
    [socket, state.currentUser],
  );

  const approveEntry = useCallback(
    (teamId: string): Promise<Team> => {
      return new Promise((resolve, reject) => {
        if (!socket) return reject(new Error('Socket not connected'));
        socket.emit('team:approve-entry', { teamId }, (team: Team | null) => {
          if (team) resolve(team);
          else reject(new Error('Team not found'));
        });
      });
    },
    [socket],
  );

  const rejectEntry = useCallback(
    (teamId: string) => {
      if (!socket) return;
      socket.emit('team:reject-entry', { teamId });
    },
    [socket],
  );

  const conferAbility = useCallback(
    (teamId: string, ability: AbilityType): Promise<Team> => {
      return new Promise((resolve, reject) => {
        if (!socket) return reject(new Error('Socket not connected'));
        socket.emit('team:confer-ability', { teamId, ability }, (team: Team | null) => {
          if (team) resolve(team);
          else reject(new Error('Unable to confer ability'));
        });
      });
    },
    [socket],
  );

  const createTimer = useCallback(
    (label: string, duration: number): Promise<NukeTimer> => {
      return new Promise((resolve, reject) => {
        if (!socket) return reject(new Error('Socket not connected'));
        socket.emit(
          'timer:create',
          { label, duration, createdBy: state.currentUser?.id || '' },
          (timer: NukeTimer) => resolve(timer),
        );
      });
    },
    [socket, state.currentUser],
  );

  const startTimer = useCallback(
    (timerId: string) => {
      if (!socket) return;
      socket.emit('timer:start', { timerId });
    },
    [socket],
  );

  const stopTimer = useCallback(
    (timerId: string) => {
      if (!socket) return;
      socket.emit('timer:stop', { timerId });
    },
    [socket],
  );

  const resetTimer = useCallback(
    (timerId: string) => {
      if (!socket) return;
      socket.emit('timer:reset', { timerId });
    },
    [socket],
  );

  const updateTimerLabel = useCallback(
    (timerId: string, label: string) => {
      if (!socket) return;
      socket.emit('timer:update-label', { timerId, label });
    },
    [socket],
  );

  const resetGame = useCallback(() => {
    if (!socket) return;
    socket.emit('game:reset');
  }, [socket]);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        registerUser,
        createTeam,
        approveEntry,
        rejectEntry,
        conferAbility,
        createTimer,
        startTimer,
        stopTimer,
        resetTimer,
        updateTimerLabel,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
