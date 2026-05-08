import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';

function AdjudicatorName() {
  const navigate = useNavigate();
  const { registerUser } = useGame();

  const handleSubmit = async (name: string) => {
    await registerUser(name, 'adjudicator');
    navigate('/adjudicator/teams');
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Adjudicator' }]} />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Adjudicator
      </Typography>
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default AdjudicatorName;
