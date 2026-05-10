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
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGame, AbilityType } from '../contexts/GameContext';

const ABILITY_ICONS: { type: AbilityType; icon: React.ReactNode; label: string; color: string }[] = [
  { type: 'star', icon: <StarIcon sx={{ fontSize: 36 }} />, label: 'Star', color: '#FFD600' },
  { type: 'nuke', icon: <CrisisAlertIcon sx={{ fontSize: 36 }} />, label: 'Nuke', color: '#F44336' },
  { type: 'interceptor', icon: <AutoFixNormalIcon sx={{ fontSize: 36 }} />, label: 'Interceptor', color: '#4CAF50' },
  { type: 'meh', icon: <SentimentNeutralIcon sx={{ fontSize: 36 }} />, label: 'Meh', color: '#FFD600' },
];

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
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Adjudicator', path: '/adjudicator' },
          { label: 'Teams', path: '/adjudicator/teams' },
          { label: team.name },
        ]}
      />
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="h1" sx={{ fontSize: '2.2rem', mb: 3 }}>
          {team.icon} {team.name}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center' }}>
            <IconButton onClick={handleApprove} sx={{ p: 0 }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50' }} />
            </IconButton>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              Approve
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <IconButton onClick={handleReject} sx={{ p: 0 }}>
              <CancelIcon sx={{ fontSize: 80, color: '#F44336' }} />
            </IconButton>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 1 }}>
              Reject
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ fontSize: '1.3rem', mb: 4, textAlign: 'left' }}>
          Entries until next ability: {team.entriesUntilAbility}
        </Typography>

        <Typography variant="h3" sx={{ textAlign: 'left', mb: 2 }}>
          Abilities unlocked
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          {ABILITY_ICONS.map(({ type, icon, color }) => (
            <IconButton
              key={type}
              onClick={() => handleAbilityClick(type)}
              disabled={!abilitiesUnlocked}
              sx={{
                width: 56,
                height: 56,
                bgcolor: abilitiesUnlocked ? 'primary.light' : '#E0DDD8',
                color: abilitiesUnlocked ? color : '#9F8B7B',
                borderRadius: '50%',
                '&:hover': abilitiesUnlocked
                  ? { bgcolor: 'primary.main', color: 'white' }
                  : {},
                '&.Mui-disabled': {
                  color: '#9F8B7B',
                  bgcolor: '#E0DDD8',
                },
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>

        <Typography variant="h3" sx={{ textAlign: 'left', mb: 2 }}>
          Abilities earned
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {team.abilitiesEarned.map((ability, idx) => {
            const abilityDef = ABILITY_ICONS.find((a) => a.type === ability);
            return (
              <Box
                key={idx}
                sx={{
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.light',
                  borderRadius: '50%',
                  color: abilityDef?.color ?? 'primary.dark',
                }}
              >
                {abilityDef?.icon}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Dialog open={confirmAbility !== null} onClose={() => setConfirmAbility(null)}>
        <DialogTitle>Confirm Ability</DialogTitle>
        <DialogContent>
          <DialogContentText>Is the team sure they want this ability?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmAbility(null)}>No</Button>
          <Button variant="contained" onClick={handleConfirmAbility}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdjudicatorReview;
