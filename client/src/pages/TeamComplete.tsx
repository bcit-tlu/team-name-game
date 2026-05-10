import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useGame } from '../contexts/GameContext';

function TeamComplete() {
  const navigate = useNavigate();
  const { state } = useGame();
  const userTeam = state.currentUser
    ? state.teams.find((t) => t.members.includes(state.currentUser!.id))
    : undefined;

  return (
    <Box>
      <PageHeader
        title="Get ready to play!"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Team Member', path: '/team-member' },
          { label: 'Register', path: '/team-member/register' },
          { label: 'Complete' },
        ]}
      />
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Think of unique names that adjudicators won't have heard before.
      </Typography>
      {userTeam && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate(`/teams/${userTeam.id}`)}
        >
          Go to your team
        </Button>
      )}
    </Box>
  );
}

export default TeamComplete;
