import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';

function TeamMemberName() {
  const navigate = useNavigate();
  const { registerUser } = useGame();

  const handleSubmit = async (name: string) => {
    await registerUser(name, 'team-member');
    navigate('/team-member/register');
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
