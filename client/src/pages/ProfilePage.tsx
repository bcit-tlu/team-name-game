import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
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
      <Box sx={{ textAlign: 'center', pt: 2 }}>
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Profile' }]} />
        <Typography variant="h1" sx={{ mb: 3, fontSize: '1.8rem' }}>
          Profile
        </Typography>
        <Typography variant="body1" sx={{ color: '#9F8B7B', fontSize: '1.1rem' }}>
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
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Profile' }]} />
      <Typography variant="h1" sx={{ mb: 3, fontSize: '1.8rem' }}>
        Profile
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#9F8B7B' }}>
          Name
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
          {currentUser.name}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#9F8B7B' }}>
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

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#9F8B7B' }}>
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
          <Typography variant="h6" sx={{ fontSize: '1.4rem', color: '#9F8B7B' }}>
            Not on a team
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;
