import { Box, Typography } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';

function TeamComplete() {
  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Team Member', path: '/team-member' },
          { label: 'Register', path: '/team-member/register' },
          { label: 'Complete' },
        ]}
      />
      <Typography variant="h1" sx={{ mb: 2 }}>
        Get ready to play!
      </Typography>
      <Typography variant="h2">Think of unique names!</Typography>
    </Box>
  );
}

export default TeamComplete;
