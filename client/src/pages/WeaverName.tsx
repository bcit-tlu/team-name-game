import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';

function WeaverName() {
  const navigate = useNavigate();
  const { registerUser } = useGame();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (name: string) => {
    try {
      await registerUser(name, 'weaver');
      navigate('/weaver/camera');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Weaver' }]} />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Weaver
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default WeaverName;
