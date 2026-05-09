import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { useGame } from '../contexts/GameContext';

function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { state, leaveTeam } = useGame();
  const { currentUser, teams, users } = state;

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

  const isCurrentUserMember = currentUser
    ? team.members.includes(currentUser.id)
    : false;

  const handleLeaveTeam = async () => {
    await leaveTeam(team.id);
    navigate('/teams');
  };

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h1" sx={{ mb: 1, fontSize: '2rem' }}>
        {team.icon} {team.name}
      </Typography>

      <Divider sx={{ my: 2 }} />

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

      {isCurrentUserMember && (
        <Button
          variant="contained"
          color="error"
          onClick={handleLeaveTeam}
          sx={{ mt: 3, textTransform: 'none', fontSize: '1rem' }}
        >
          Leave Team
        </Button>
      )}
    </Box>
  );
}

export default TeamDetail;
