import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';

function WeaverName() {
  const navigate = useNavigate();
  const { registerUser } = useGame();

  const handleSubmit = async (name: string) => {
    await registerUser(name, 'weaver');
    navigate('/weaver/camera');
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Weaver' }]} />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Weaver
      </Typography>
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default WeaverName;
