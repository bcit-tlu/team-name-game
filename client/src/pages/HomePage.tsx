import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Link } from '@mui/material';
import { useGame, Role } from '../contexts/GameContext';

function HomePage() {
  const navigate = useNavigate();
  const { state } = useGame();
  const { currentUser } = state;

  const userTeam = currentUser
    ? state.teams.find((t) => t.members.includes(currentUser.id))
    : undefined;

  const roles: { label: string; path: string; role: Role }[] = [
    { label: 'Team Member', path: '/team-member', role: 'team-member' },
    { label: 'Adjudicator', path: '/adjudicator', role: 'adjudicator' },
    { label: 'Timer', path: '/timer', role: 'timer' },
    { label: 'Weaver', path: '/weaver', role: 'weaver' },
  ];

  return (
    <Box sx={{ textAlign: 'center', pt: 2 }}>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2rem' }}>
        Select Your Role
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {roles.map((role) => {
          const isActive = currentUser?.role === role.role;
          const isDisabled = currentUser !== null && !isActive;
          return (
            <Button
              key={role.path}
              variant="contained"
              color="primary"
              fullWidth
              disabled={isDisabled}
              onClick={() => {
                if (isActive && role.role === 'team-member' && userTeam) {
                  navigate(`/teams/${userTeam.id}`);
                } else {
                  navigate(role.path);
                }
              }}
              sx={{
                py: 3,
                fontSize: '1.3rem',
                fontWeight: 600,
                borderRadius: 2,
                ...(isActive && {
                  border: '3px solid',
                  borderColor: 'primary.dark',
                }),
              }}
            >
              {role.label}
              {isActive && ' (Active)'}
            </Button>
          );
        })}
      </Box>

      <Link
        component="button"
        onClick={() => navigate('/admin')}
        sx={{ mt: 6, display: 'block', color: '#9F8B7B', fontSize: '0.9rem' }}
      >
        Admin
      </Link>
    </Box>
  );
}

export default HomePage;
