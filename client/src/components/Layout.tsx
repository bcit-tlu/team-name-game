import { useRef } from 'react';
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
  Container,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RateReviewIcon from '@mui/icons-material/RateReview';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useSession } from '../contexts/SessionContext';

export const APP_MAX_WIDTH = 480;
export const BOTTOM_NAV_HEIGHT = 76;

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionInfo } = useSession();
  const previousPathRef = useRef<string>('/');

  const handleProfileClick = () => {
    if (location.pathname === '/profile') {
      navigate(previousPathRef.current);
    } else {
      previousPathRef.current = location.pathname;
      navigate('/profile');
    }
  };

  const getNavValue = () => {
    if (location.pathname === '/teams' || location.pathname.startsWith('/teams/')) return 1;
    if (location.pathname === '/feedback') return 2;
    return 0;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ flex: 1, color: 'primary.contrastText', fontSize: '1.25rem' }}
          >
            Team Name Game
          </Typography>
          <IconButton
            onClick={() => navigate('/intro')}
            aria-label="Game info"
            sx={{ color: 'primary.contrastText' }}
          >
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={handleProfileClick}
            aria-label="Open profile"
            sx={{ p: 0.5, color: 'primary.contrastText' }}
          >
            {sessionInfo ? (
              <Avatar
                sx={{
                  bgcolor: 'primary.dark',
                  width: 44,
                  height: 44,
                  fontSize: '1.375rem',
                  border: '1px solid',
                  borderColor: 'primary.contrastText',
                }}
              >
                {sessionInfo.emoji}
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: 'primary.dark',
                  width: 44,
                  height: 44,
                  border: '1px solid',
                  borderColor: 'primary.contrastText',
                }}
              >
                <PersonIcon sx={{ fontSize: 24, color: 'primary.contrastText' }} />
              </Avatar>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container
        component="main"
        maxWidth={false}
        sx={{
          flex: 1,
          px: 2,
          pt: 2,
          pb: `${BOTTOM_NAV_HEIGHT + 16}px`,
          maxWidth: APP_MAX_WIDTH,
          width: '100%',
        }}
      >
        <Outlet />
      </Container>

      <BottomNavigation
        value={getNavValue()}
        showLabels
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
          maxWidth: APP_MAX_WIDTH,
          mx: 'auto',
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Teams & Roles" icon={<EmojiEventsIcon />} />
        <BottomNavigationAction label="Feedback" icon={<RateReviewIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Layout;
