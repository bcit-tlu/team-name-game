import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const logger = logs.getLogger('analytics');

function emit(event: string, attributes: Record<string, string | number> = {}): void {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: event,
    attributes: { event, ...attributes },
  });
}

export const analytics = {
  userRegistered(attrs: { user_id: string; user_name: string; role: string; socket_id: string }) {
    emit('user.registered', attrs);
  },

  userDisconnected(attrs: { user_id: string; socket_id: string }) {
    emit('user.disconnected', attrs);
  },

  teamCreated(attrs: { team_id: string; team_name: string; created_by: string }) {
    emit('team.created', attrs);
  },

  teamJoined(attrs: { team_id: string; user_id: string }) {
    emit('team.joined', attrs);
  },

  teamLeft(attrs: { team_id: string; user_id: string }) {
    emit('team.left', attrs);
  },

  teamEntryApproved(attrs: { team_id: string; approved_entries: number }) {
    emit('team.entry_approved', attrs);
  },

  teamEntryRejected(attrs: { team_id: string }) {
    emit('team.entry_rejected', attrs);
  },

  teamAbilityConferred(attrs: { team_id: string; ability: string }) {
    emit('team.ability_conferred', attrs);
  },

  timerCreated(attrs: { timer_id: string; label: string; duration: number; created_by: string }) {
    emit('timer.created', attrs);
  },

  timerStarted(attrs: { timer_id: string }) {
    emit('timer.started', attrs);
  },

  timerStopped(attrs: { timer_id: string }) {
    emit('timer.stopped', attrs);
  },

  gameReset() {
    emit('game.reset');
  },
};
