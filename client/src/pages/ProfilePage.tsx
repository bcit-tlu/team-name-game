import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useGame } from '../contexts/GameContext';

function ProfilePage() {
  const navigate = useNavigate();
  const { state, removeRole, leaveTeam } = useGame();
  const { currentUser, teams } = state;

  const userTeam = currentUser
    ? teams.find((t) => t.members.includes(currentUser.id))
    : undefined;

  const handleRemoveRole = async () => {
    await removeRole();
    navigate('/');
  };

  const handleLeaveTeam = async () => {
    if (!userTeam) return;
    await leaveTeam(userTeam.id);
  };

  if (!currentUser) {
    return (
      <Box sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h1" sx={{ mb: 3, fontSize: '1.8rem' }}>
          Profile
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.600', fontSize: '1.1rem' }}>
          No role selected yet. Go to the home screen to pick a role.
        </Typography>
      </Box>
    );
  }

  const roleName = currentUser.role
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h1" sx={{ mb: 3, fontSize: '1.8rem' }}>
        Profile
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'grey.600' }}>
          Name
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
          {currentUser.name}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'grey.600' }}>
          Role
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
          {roleName}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleRemoveRole}
          sx={{ mt: 2, textTransform: 'none', fontSize: '1rem' }}
        >
          Remove Role
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'grey.600' }}>
          Team
        </Typography>
        {userTeam ? (
          <>
            <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
              {userTeam.icon} {userTeam.name}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleLeaveTeam}
              sx={{ mt: 2, textTransform: 'none', fontSize: '1rem' }}
            >
              Leave Team
            </Button>
          </>
        ) : (
          <Typography variant="h6" sx={{ fontSize: '1.4rem', color: 'grey.500' }}>
            Not on a team
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;
