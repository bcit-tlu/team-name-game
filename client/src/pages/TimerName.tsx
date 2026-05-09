import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';

function TimerName() {
  const navigate = useNavigate();
  const { state, registerUser, createTimer } = useGame();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (name: string) => {
    try {
      await registerUser(name, 'timer');
      if (state.timers.length === 0) {
        const DEFAULT_DURATION = 300;
        for (let i = 0; i < 4; i++) {
          await createTimer('', DEFAULT_DURATION);
        }
      }
      navigate('/timer/display');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Timer' }]} />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Timer
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default TimerName;
