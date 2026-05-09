import { GameState, Team, User, NukeTimer, AbilityType } from './types.js';
import { randomUUID } from 'crypto';

const ABILITY_THRESHOLD = 4;

class GameStore {
  private state: GameState = {
    users: [],
    teams: [],
    timers: [],
  };

  getState(): GameState {
    return { ...this.state };
  }

  registerUser(name: string, role: User['role'], socketId: string): User {
    const user: User = {
      id: randomUUID(),
      name,
      role,
      socketId,
    };
    this.state.users.push(user);
    return user;
  }

  removeUserBySocket(socketId: string): User | undefined {
    const idx = this.state.users.findIndex((u) => u.socketId === socketId);
    if (idx === -1) return undefined;
    const [removed] = this.state.users.splice(idx, 1);
    return removed;
  }

  removeUser(userId: string): User | undefined {
    const idx = this.state.users.findIndex((u) => u.id === userId);
    if (idx === -1) return undefined;
    const [removed] = this.state.users.splice(idx, 1);
    return removed;
  }

  joinTeam(teamId: string, userId: string): Team | undefined {
    const team = this.state.teams.find((t) => t.id === teamId);
    if (!team) return undefined;
    if (team.members.includes(userId)) return team;
    team.members.push(userId);
    return team;
  }

  leaveTeam(teamId: string, userId: string): Team | undefined {
    const team = this.state.teams.find((t) => t.id === teamId);
    if (!team) return undefined;
    team.members = team.members.filter((m) => m !== userId);
    return team;
  }

  createTeam(name: string, icon: string, createdBy: string): Team {
    const team: Team = {
      id: randomUUID(),
      name,
      icon,
      members: [createdBy],
      entriesUntilAbility: ABILITY_THRESHOLD,
      abilitiesEarned: [],
      createdBy,
    };
    this.state.teams.push(team);
    return team;
  }

  approveEntry(teamId: string): Team | undefined {
    const team = this.state.teams.find((t) => t.id === teamId);
    if (!team) return undefined;
    if (team.entriesUntilAbility > 0) {
      team.entriesUntilAbility--;
    }
    return team;
  }

  conferAbility(teamId: string, ability: AbilityType): Team | undefined {
    const team = this.state.teams.find((t) => t.id === teamId);
    if (!team) return undefined;
    if (team.entriesUntilAbility !== 0) return undefined;
    team.abilitiesEarned.push(ability);
    team.entriesUntilAbility = ABILITY_THRESHOLD;
    return team;
  }

  createTimer(label: string, duration: number, createdBy: string): NukeTimer {
    const timer: NukeTimer = {
      id: randomUUID(),
      label,
      duration,
      remaining: duration,
      isRunning: false,
      createdBy,
    };
    this.state.timers.push(timer);
    return timer;
  }

  getTimer(timerId: string): NukeTimer | undefined {
    return this.state.timers.find((t) => t.id === timerId);
  }

  updateTimer(timerId: string, updates: Partial<NukeTimer>): NukeTimer | undefined {
    const timer = this.state.timers.find((t) => t.id === timerId);
    if (!timer) return undefined;
    Object.assign(timer, updates);
    return timer;
  }

  removeTimer(timerId: string): boolean {
    const idx = this.state.timers.findIndex((t) => t.id === timerId);
    if (idx === -1) return false;
    this.state.timers.splice(idx, 1);
    return true;
  }

  reset(): void {
    this.state = {
      users: [],
      teams: [],
      timers: [],
    };
  }
}

export const store = new GameStore();
