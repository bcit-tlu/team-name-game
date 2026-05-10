import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';
import { useSession } from '../contexts/SessionContext';

function TimerName() {
  const navigate = useNavigate();
  const { state, registerUser, createTimer } = useGame();
  const { sessionInfo, setSessionInfo } = useSession();
  const autoRegistered = useRef(false);

  const [error, setError] = useState<string | null>(null);

  const doRegister = async (name: string) => {
    await registerUser(name, 'timer');
    if (state.timers.length === 0) {
      const DEFAULT_DURATION = 300;
      for (let i = 0; i < 4; i++) {
        await createTimer('', DEFAULT_DURATION);
      }
    }
    navigate('/timer/display', { replace: true });
  };

  useEffect(() => {
    if (state.currentUser?.role === 'timer') {
      navigate('/timer/display', { replace: true });
    }
  }, [state.currentUser, navigate]);

  useEffect(() => {
    if (!state.currentUser && sessionInfo && !autoRegistered.current) {
      autoRegistered.current = true;
      doRegister(sessionInfo.name).catch((err) => {
        autoRegistered.current = false;
        setError(err instanceof Error ? err.message : 'Registration failed');
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentUser, sessionInfo]);

  if (state.currentUser?.role === 'timer') return null;
  if (sessionInfo && !state.currentUser) return null;

  const handleSubmit = async (name: string, emoji: string) => {
    try {
      setSessionInfo({ name, emoji });
      await doRegister(name);
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
