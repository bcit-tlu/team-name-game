import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Avatar,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import { useGame } from '../contexts/GameContext';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useGame();
  const { currentUser } = state;

  const getNavValue = () => {
    if (location.pathname === '/teams' || location.pathname.startsWith('/teams/')) return 1;
    if (location.pathname === '/feedback') return 2;
    return 0;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: 'white', fontSize: '1.3rem', flex: 1 }}
          >
            Team Name Game
          </Typography>
          <IconButton onClick={() => navigate('/profile')} sx={{ p: 0 }}>
            {currentUser ? (
              <Avatar
                sx={{
                  bgcolor: 'primary.dark',
                  width: 36,
                  height: 36,
                  fontSize: '1rem',
                  fontWeight: 700,
                  border: '2px solid white',
                }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: '#9F8B7B',
                  width: 36,
                  height: 36,
                  border: '2px solid white',
                }}
              >
                <PersonIcon sx={{ fontSize: 20, color: 'white' }} />
              </Avatar>
            )}
          </IconButton>
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
          borderTop: '1px solid #9F8B7B',
          bgcolor: '#F3F5F5',
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon sx={{ fontSize: 32 }} />}
          sx={{ color: location.pathname === '/' ? 'primary.dark' : '#9F8B7B' }}
        />
        <BottomNavigationAction
          label="Teams"
          icon={<EmojiEventsIcon sx={{ fontSize: 32 }} />}
          sx={{
            color:
              location.pathname === '/teams' || location.pathname.startsWith('/teams/')
                ? 'primary.dark'
                : '#9F8B7B',
          }}
        />
        <BottomNavigationAction
          label="Feedback"
          icon={<RateReviewIcon sx={{ fontSize: 32 }} />}
          sx={{ color: location.pathname === '/feedback' ? 'primary.dark' : '#9F8B7B' }}
        />
      </BottomNavigation>
    </Box>
  );
}

export default Layout;
