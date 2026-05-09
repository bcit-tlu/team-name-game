import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';

function TeamMemberName() {
  const navigate = useNavigate();
  const { state, registerUser } = useGame();
  const { currentUser, teams } = state;

  const userTeam = currentUser
    ? teams.find((t) => t.members.includes(currentUser.id))
    : undefined;

  useEffect(() => {
    if (currentUser && userTeam) {
      navigate(`/teams/${userTeam.id}`, { replace: true });
    } else if (currentUser && currentUser.role === 'team-member') {
      navigate('/team-member/teams', { replace: true });
    }
  }, [currentUser, userTeam, navigate]);

  const handleSubmit = async (name: string) => {
    await registerUser(name, 'team-member');
    navigate('/team-member/teams');
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Team Member' }]} />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Team Member
      </Typography>
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default TeamMemberName;
