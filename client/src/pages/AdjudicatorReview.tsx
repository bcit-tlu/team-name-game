import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PageHeader from '../components/PageHeader';
import AbilityBadge from '../components/AbilityBadge';
import { useGame, AbilityType } from '../contexts/GameContext';
import { ABILITIES, ABILITY_ORDER } from '../theme/abilities';

function AdjudicatorReview() {
  const { teamId } = useParams<{ teamId: string }>();
  const { state, approveEntry, rejectEntry, conferAbility } = useGame();
  const [confirmAbility, setConfirmAbility] = useState<AbilityType | null>(null);

  const team = state.teams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h2">Team not found</Typography>
      </Box>
    );
  }

  const abilitiesUnlocked = team.entriesUntilAbility === 0;

  const handleApprove = () => {
    approveEntry(team.id).catch(() => {});
  };

  const handleReject = () => {
    rejectEntry(team.id);
  };

  const handleAbilityClick = (ability: AbilityType) => {
    if (!abilitiesUnlocked) return;
    setConfirmAbility(ability);
  };

  const handleConfirmAbility = async () => {
    if (confirmAbility) {
      try {
        await conferAbility(team.id, confirmAbility);
      } catch {
        // Ability may have been conferred by another adjudicator
      }
      setConfirmAbility(null);
    }
  };

  return (
    <Box>
      <PageHeader
        title={`${team.icon} ${team.name}`}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Teams', path: '/adjudicator/teams' },
          { label: team.name },
        ]}
      />

      <Paper
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 3,
          mb: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}
        >
          Review entry
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
          <Stack alignItems="center" spacing={0.5}>
            <IconButton
              onClick={handleApprove}
              aria-label="Approve entry"
              sx={{ p: 0, color: 'success.main' }}
            >
              <CheckCircleIcon sx={{ fontSize: 72 }} />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Approve
            </Typography>
          </Stack>
          <Stack alignItems="center" spacing={0.5}>
            <IconButton
              onClick={handleReject}
              aria-label="Reject entry"
              sx={{ p: 0, color: 'error.main' }}
            >
              <CancelIcon sx={{ fontSize: 72 }} />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Reject
            </Typography>
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Abilities to unlock
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          {abilitiesUnlocked
            ? 'Tap an ability to confer it on this team.'
            : `${team.entriesUntilAbility} more approval${team.entriesUntilAbility === 1 ? '' : 's'} until the next ability unlocks.`}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {ABILITY_ORDER.map((type) => {
            const def = ABILITIES[type];
            return (
              <IconButton
                key={type}
                onClick={() => handleAbilityClick(type)}
                disabled={!abilitiesUnlocked}
                aria-label={`Confer ${def.label}`}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '1.5px solid',
                  borderColor: 'divider',
                  bgcolor: abilitiesUnlocked ? 'background.paper' : 'action.disabledBackground',
                  color: abilitiesUnlocked ? def.color : 'action.disabled',
                  '&:hover': abilitiesUnlocked
                    ? { bgcolor: 'action.hover', borderColor: 'primary.light' }
                    : {},
                  '&.Mui-disabled': {
                    color: 'action.disabled',
                    bgcolor: 'action.disabledBackground',
                  },
                }}
              >
                {def.renderIcon(32)}
              </IconButton>
            );
          })}
        </Box>
      </Box>

      <Box>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Abilities earned
        </Typography>
        {team.abilitiesEarned.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            None yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {team.abilitiesEarned.map((ability, idx) => (
              <AbilityBadge key={idx} ability={ability} variant="filled" />
            ))}
          </Box>
        )}
      </Box>

      <Dialog open={confirmAbility !== null} onClose={() => setConfirmAbility(null)}>
        <DialogTitle>Confer ability</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Is the team sure they want this ability?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmAbility(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmAbility}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdjudicatorReview;
