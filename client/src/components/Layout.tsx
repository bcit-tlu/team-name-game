import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RateReviewIcon from '@mui/icons-material/RateReview';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavValue = () => {
    if (location.pathname === '/teams') return 1;
    if (location.pathname === '/feedback') return 2;
    return 0;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', fontSize: '1.3rem' }}>
            Team Name Game
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, p: 2, pb: 10 }}>
        <Outlet />
      </Box>

      <BottomNavigation
        value={getNavValue()}
        onChange={(_e, newValue) => {
          if (newValue === 0) navigate('/');
          else if (newValue === 1) navigate('/teams');
          else if (newValue === 2) navigate('/feedback');
        }}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: 480,
          mx: 'auto',
          borderTop: '1px solid #eee',
          bgcolor: 'white',
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon sx={{ fontSize: 32 }} />}
          sx={{ color: location.pathname === '/' ? 'primary.main' : 'grey.500' }}
        />
        <BottomNavigationAction
          label="Teams"
          icon={<EmojiEventsIcon sx={{ fontSize: 32 }} />}
          sx={{ color: location.pathname === '/teams' ? 'primary.main' : 'grey.500' }}
        />
        <BottomNavigationAction
          label="Feedback"
          icon={<RateReviewIcon sx={{ fontSize: 32 }} />}
          sx={{ color: location.pathname === '/feedback' ? 'primary.main' : 'grey.500' }}
        />
      </BottomNavigation>
    </Box>
  );
}

export default Layout;
