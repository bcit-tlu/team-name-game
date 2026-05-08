export interface User {
  id: string;
  name: string;
  role: Role;
  socketId: string;
}

export type Role = 'team-member' | 'adjudicator' | 'timer' | 'weaver';

export type AbilityType = 'star' | 'nuke' | 'interceptor' | 'meh';

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

export interface GameState {
  users: User[];
  teams: Team[];
  timers: NukeTimer[];
}

export interface ServerToClientEvents {
  'state:full': (state: GameState) => void;
  'user:registered': (user: User) => void;
  'user:removed': (userId: string) => void;
  'team:created': (team: Team) => void;
  'team:updated': (team: Team) => void;
  'team:removed': (teamId: string) => void;
  'timer:created': (timer: NukeTimer) => void;
  'timer:updated': (timer: NukeTimer) => void;
  'timer:removed': (timerId: string) => void;
  'game:reset': () => void;
}

export interface ClientToServerEvents {
  'user:register': (data: { name: string; role: Role }, callback: (user: User) => void) => void;
  'team:create': (data: { name: string; icon: string; createdBy: string }, callback: (team: Team) => void) => void;
  'team:approve-entry': (data: { teamId: string }, callback: (team: Team | null) => void) => void;
  'team:reject-entry': (data: { teamId: string }) => void;
  'team:confer-ability': (data: { teamId: string; ability: AbilityType }, callback: (team: Team | null) => void) => void;
  'timer:create': (data: { label: string; duration: number; createdBy: string }, callback: (timer: NukeTimer) => void) => void;
  'timer:start': (data: { timerId: string }) => void;
  'timer:stop': (data: { timerId: string }) => void;
  'timer:reset': (data: { timerId: string }) => void;
  'timer:update-label': (data: { timerId: string; label: string }) => void;
  'game:reset': () => void;
}
