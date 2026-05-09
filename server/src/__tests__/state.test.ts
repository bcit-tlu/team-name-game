import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '../state.js';

describe('GameStore', () => {
  beforeEach(() => {
    store.reset();
  });

  describe('registerUser', () => {
    it('should register a user and return user object', () => {
      const user = store.registerUser('Alice B', 'team-member', 'socket-1');
      expect(user).toBeDefined();
      expect(user!.name).toBe('Alice B');
      expect(user!.role).toBe('team-member');
      expect(user!.socketId).toBe('socket-1');
      expect(user!.id).toBeDefined();
    });

    it('should add user to state', () => {
      store.registerUser('Alice B', 'team-member', 'socket-1');
      const state = store.getState();
      expect(state.users).toHaveLength(1);
      expect(state.users[0].name).toBe('Alice B');
    });

    it('should register multiple users', () => {
      store.registerUser('Alice B', 'team-member', 'socket-1');
      store.registerUser('Bob C', 'adjudicator', 'socket-2');
      const state = store.getState();
      expect(state.users).toHaveLength(2);
    });

    it('should enforce role limits for adjudicator (max 3)', () => {
      store.registerUser('A1', 'adjudicator', 's1');
      store.registerUser('A2', 'adjudicator', 's2');
      store.registerUser('A3', 'adjudicator', 's3');
      const fourth = store.registerUser('A4', 'adjudicator', 's4');
      expect(fourth).toBeUndefined();
      expect(store.getState().users.filter((u) => u.role === 'adjudicator')).toHaveLength(3);
    });

    it('should enforce role limits for timer (max 1)', () => {
      store.registerUser('T1', 'timer', 's1');
      const second = store.registerUser('T2', 'timer', 's2');
      expect(second).toBeUndefined();
      expect(store.getState().users.filter((u) => u.role === 'timer')).toHaveLength(1);
    });

    it('should enforce role limits for weaver (max 1)', () => {
      store.registerUser('W1', 'weaver', 's1');
      const second = store.registerUser('W2', 'weaver', 's2');
      expect(second).toBeUndefined();
      expect(store.getState().users.filter((u) => u.role === 'weaver')).toHaveLength(1);
    });

    it('should allow unlimited team-member registrations', () => {
      for (let i = 0; i < 10; i++) {
        const user = store.registerUser(`TM${i}`, 'team-member', `s${i}`);
        expect(user).toBeDefined();
      }
      expect(store.getState().users.filter((u) => u.role === 'team-member')).toHaveLength(10);
    });
  });

  describe('removeUserBySocket', () => {
    it('should remove a user by socket id', () => {
      store.registerUser('Alice B', 'team-member', 'socket-1');
      const removed = store.removeUserBySocket('socket-1');
      expect(removed?.name).toBe('Alice B');
      expect(store.getState().users).toHaveLength(0);
    });

    it('should return undefined for non-existent socket', () => {
      const removed = store.removeUserBySocket('non-existent');
      expect(removed).toBeUndefined();
    });
  });

  describe('createTeam', () => {
    it('should create a team with correct defaults', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1');
      expect(team).toBeDefined();
      expect(team!.name).toBe('Thunder');
      expect(team!.icon).toBe('⚡');
      expect(team!.members).toEqual(['user-1']);
      expect(team!.entriesUntilAbility).toBe(4);
      expect(team!.abilitiesEarned).toEqual([]);
      expect(team!.createdBy).toBe('user-1');
    });

    it('should add team to state', () => {
      store.createTeam('Thunder', '⚡', 'user-1');
      const state = store.getState();
      expect(state.teams).toHaveLength(1);
    });

    it('should prevent creating a team if user is already on a team', () => {
      store.createTeam('Thunder', '⚡', 'user-1');
      const second = store.createTeam('Lightning', '🌩️', 'user-1');
      expect(second).toBeUndefined();
      expect(store.getState().teams).toHaveLength(1);
    });
  });

  describe('joinTeam', () => {
    it('should add user to team members', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;
      const updated = store.joinTeam(team.id, 'user-2');
      expect(updated).toBeDefined();
      expect(updated!.members).toContain('user-2');
      expect(updated!.members).toHaveLength(2);
    });

    it('should return undefined for non-existent team', () => {
      const result = store.joinTeam('non-existent', 'user-1');
      expect(result).toBeUndefined();
    });

    it('should idempotently return team if user is already a member', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;
      const result = store.joinTeam(team.id, 'user-1');
      expect(result).toBeDefined();
      expect(result!.members).toEqual(['user-1']);
    });

    it('should return undefined if user is already on a different team', () => {
      store.createTeam('Thunder', '⚡', 'user-1');
      const team2 = store.createTeam('Lightning', '🌩️', 'user-2')!;
      const result = store.joinTeam(team2.id, 'user-1');
      expect(result).toBeUndefined();
    });
  });

  describe('approveEntry', () => {
    it('should decrement entriesUntilAbility', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;
      const updated = store.approveEntry(team.id);
      expect(updated?.entriesUntilAbility).toBe(3);
    });

    it('should decrement to zero', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;
      store.approveEntry(team.id);
      store.approveEntry(team.id);
      store.approveEntry(team.id);
      const updated = store.approveEntry(team.id);
      expect(updated?.entriesUntilAbility).toBe(0);
    });

    it('should not go below zero', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;
      store.approveEntry(team.id);
      store.approveEntry(team.id);
      store.approveEntry(team.id);
      store.approveEntry(team.id);
      const updated = store.approveEntry(team.id);
      expect(updated?.entriesUntilAbility).toBe(0);
    });

    it('should return undefined for non-existent team', () => {
      const result = store.approveEntry('non-existent');
      expect(result).toBeUndefined();
    });
  });

  describe('conferAbility', () => {
    it('should add ability and reset counter when entries is 0', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;
      store.approveEntry(team.id);
      store.approveEntry(team.id);
      store.approveEntry(team.id);
      store.approveEntry(team.id);

      const updated = store.conferAbility(team.id, 'star');
      expect(updated?.abilitiesEarned).toEqual(['star']);
      expect(updated?.entriesUntilAbility).toBe(4);
    });

    it('should not confer ability when entries remaining > 0', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;
      store.approveEntry(team.id);

      const result = store.conferAbility(team.id, 'nuke');
      expect(result).toBeUndefined();
    });

    it('should accumulate multiple abilities', () => {
      const team = store.createTeam('Thunder', '⚡', 'user-1')!;

      // First ability cycle
      for (let i = 0; i < 4; i++) store.approveEntry(team.id);
      store.conferAbility(team.id, 'star');

      // Second ability cycle
      for (let i = 0; i < 4; i++) store.approveEntry(team.id);
      const updated = store.conferAbility(team.id, 'nuke');

      expect(updated?.abilitiesEarned).toEqual(['star', 'nuke']);
    });

    it('should return undefined for non-existent team', () => {
      const result = store.conferAbility('non-existent', 'star');
      expect(result).toBeUndefined();
    });
  });

  describe('timer management', () => {
    it('should create a timer with correct defaults', () => {
      const timer = store.createTimer('Nuke 1', 300, 'user-1');
      expect(timer.label).toBe('Nuke 1');
      expect(timer.duration).toBe(300);
      expect(timer.remaining).toBe(300);
      expect(timer.isRunning).toBe(false);
      expect(timer.createdBy).toBe('user-1');
    });

    it('should get a timer by id', () => {
      const timer = store.createTimer('Nuke 1', 300, 'user-1');
      const found = store.getTimer(timer.id);
      expect(found?.label).toBe('Nuke 1');
    });

    it('should return undefined for non-existent timer', () => {
      const found = store.getTimer('non-existent');
      expect(found).toBeUndefined();
    });

    it('should update timer properties', () => {
      const timer = store.createTimer('Nuke 1', 300, 'user-1');
      const updated = store.updateTimer(timer.id, { isRunning: true, remaining: 250 });
      expect(updated?.isRunning).toBe(true);
      expect(updated?.remaining).toBe(250);
    });

    it('should remove a timer', () => {
      const timer = store.createTimer('Nuke 1', 300, 'user-1');
      const removed = store.removeTimer(timer.id);
      expect(removed).toBe(true);
      expect(store.getState().timers).toHaveLength(0);
    });

    it('should return false when removing non-existent timer', () => {
      const removed = store.removeTimer('non-existent');
      expect(removed).toBe(false);
    });
  });

  describe('reset', () => {
    it('should clear all state', () => {
      store.registerUser('Alice B', 'team-member', 'socket-1');
      store.createTeam('Thunder', '⚡', 'user-1');
      store.createTimer('Nuke 1', 300, 'user-1');

      store.reset();
      const state = store.getState();
      expect(state.users).toHaveLength(0);
      expect(state.teams).toHaveLength(0);
      expect(state.timers).toHaveLength(0);
    });
  });
});
