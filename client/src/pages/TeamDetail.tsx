import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGame, AbilityType } from '../contexts/GameContext';

const ABILITY_ICONS: Record<AbilityType, { icon: React.ReactNode; color: string }> = {
  star: { icon: <StarIcon sx={{ fontSize: 28 }} />, color: '#FFD600' },
  nuke: { icon: <CrisisAlertIcon sx={{ fontSize: 28 }} />, color: '#F44336' },
  interceptor: { icon: <AutoFixNormalIcon sx={{ fontSize: 28 }} />, color: '#4CAF50' },
  meh: { icon: <SentimentNeutralIcon sx={{ fontSize: 28 }} />, color: '#FFD600' },
};

function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const { state } = useGame();
  const { teams, users } = state;

  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <Box sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="body1" sx={{ color: '#9F8B7B' }}>
          Team not found.
        </Typography>
      </Box>
    );
  }

  const memberUsers = team.members
    .map((memberId) => users.find((u) => u.id === memberId))
    .filter(Boolean);

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h1" sx={{ mb: 1, fontSize: '2rem' }}>
        {team.icon} {team.name}
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, mb: 4, justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 48 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#4CAF50' }}>
            {team.approvedCount}
          </Typography>
          <Typography variant="body2" sx={{ color: '#9F8B7B', fontSize: '0.95rem' }}>
            Accepted entries
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <CancelIcon sx={{ color: '#F44336', fontSize: 48 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#F44336' }}>
            {team.rejectedCount}
          </Typography>
          <Typography variant="body2" sx={{ color: '#9F8B7B', fontSize: '0.95rem' }}>
            Rejected entries
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mb: 2, fontSize: '1.2rem', color: '#9F8B7B' }}>
        Members
      </Typography>

      {memberUsers.length === 0 ? (
        <Typography variant="body1" sx={{ color: '#9F8B7B' }}>
          No members registered.
        </Typography>
      ) : (
        <List>
          {memberUsers.map((member) => (
            <ListItem key={member!.id} sx={{ py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '1rem' }}>
                  {member!.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member!.name}
                primaryTypographyProps={{ fontSize: '1.2rem' }}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Typography
        variant="body2"
        sx={{ textAlign: 'center', color: '#9F8B7B', mt: 3, fontStyle: 'italic' }}
      >
        Click your profile icon in the top right to leave the team
      </Typography>

      {team.abilitiesEarned.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '1.2rem', color: '#9F8B7B' }}>
            Abilities Earned
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {team.abilitiesEarned.map((ability, idx) => {
              const def = ABILITY_ICONS[ability];
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
                    color: def.color,
                  }}
                >
                  {def.icon}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TeamDetail;
