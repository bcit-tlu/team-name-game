import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography, Link } from '@mui/material';
import { useGame, Role } from '../contexts/GameContext';

const ROLE_LIMITS: Partial<Record<Role, number>> = {
  adjudicator: 3,
  timer: 1,
  weaver: 1,
};

const ROLES: { label: string; description: string; path: string; role: Role }[] = [
  {
    label: 'Team Member',
    description: 'Join a team and submit name entries',
    path: '/team-member',
    role: 'team-member',
  },
  {
    label: 'Adjudicator',
    description: 'Review and approve team entries',
    path: '/adjudicator',
    role: 'adjudicator',
  },
  {
    label: 'Timer',
    description: 'Manage countdown timers',
    path: '/timer',
    role: 'timer',
  },
  {
    label: 'Weaver',
    description: 'Capture the game board',
    path: '/weaver',
    role: 'weaver',
  },
];

function HomePage() {
  const navigate = useNavigate();
  const { state } = useGame();
  const { currentUser, users } = state;

  const userTeam = currentUser
    ? state.teams.find((t) => t.members.includes(currentUser.id))
    : undefined;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1, textAlign: 'center' }}>
        Select your role
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}
      >
        Pick how you'll participate in this round.
      </Typography>

      <Stack spacing={1.5}>
        {ROLES.map((role) => {
          const isActive = currentUser?.role === role.role;
          const limit = ROLE_LIMITS[role.role];
          const roleCount = users.filter((u) => u.role === role.role).length;
          const isFull = limit !== undefined && roleCount >= limit && !isActive;
          const isDisabled = (currentUser !== null && !isActive) || isFull;

          let suffix = '';
          if (isActive) suffix = ' · Active';
          else if (isFull) suffix = ' · Full';

          return (
            <Button
              key={role.path}
              variant={isActive ? 'contained' : 'outlined'}
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
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 2,
                px: 2.5,
                borderRadius: 2,
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 0.25,
              }}
            >
              <Typography
                component="span"
                sx={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}
              >
                {role.label}
                {suffix}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  opacity: isActive ? 0.85 : 0.75,
                  textTransform: 'none',
                  lineHeight: 1.3,
                }}
              >
                {role.description}
              </Typography>
            </Button>
          );
        })}
      </Stack>

      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Link
          component="button"
          onClick={() => navigate('/admin')}
          underline="hover"
          sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
        >
          Admin
        </Link>
      </Box>
    </Box>
  );
}

export default HomePage;
