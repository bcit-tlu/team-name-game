import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Link } from '@mui/material';

function HomePage() {
  const navigate = useNavigate();

  const roles = [
    { label: 'Team Member', path: '/team-member' },
    { label: 'Adjudicator', path: '/adjudicator' },
    { label: 'Timer', path: '/timer' },
    { label: 'Weaver', path: '/weaver' },
  ];

  return (
    <Box sx={{ textAlign: 'center', pt: 2 }}>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2rem' }}>
        Select Your Role
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {roles.map((role) => (
          <Button
            key={role.path}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate(role.path)}
            sx={{
              py: 3,
              fontSize: '1.3rem',
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            {role.label}
          </Button>
        ))}
      </Box>

      <Link
        component="button"
        onClick={() => navigate('/admin')}
        sx={{ mt: 6, display: 'block', color: 'grey.600', fontSize: '0.9rem' }}
      >
        Admin
      </Link>
    </Box>
  );
}

export default HomePage;
