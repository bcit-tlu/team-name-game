import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import { useGame, AbilityType } from '../contexts/GameContext';

const ABILITY_ICONS: Record<AbilityType, React.ReactNode> = {
  star: <StarIcon sx={{ fontSize: 28 }} />,
  nuke: <LocalFireDepartmentIcon sx={{ fontSize: 28 }} />,
  interceptor: <CelebrationIcon sx={{ fontSize: 28 }} />,
  meh: <SentimentNeutralIcon sx={{ fontSize: 28 }} />,
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
              <ListItemText
                primary={member!.name}
                primaryTypographyProps={{ fontSize: '1.2rem' }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {team.abilitiesEarned.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '1.2rem', color: '#9F8B7B' }}>
            Abilities Earned
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {team.abilitiesEarned.map((ability, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.light',
                  borderRadius: 1,
                  color: 'primary.dark',
                }}
              >
                {ABILITY_ICONS[ability]}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TeamDetail;
