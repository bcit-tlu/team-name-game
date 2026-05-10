import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';
import { useSession } from '../contexts/SessionContext';

function WeaverName() {
  const navigate = useNavigate();
  const { state, registerUser } = useGame();
  const { sessionInfo, setSessionInfo } = useSession();
  const autoRegistered = useRef(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.currentUser?.role === 'weaver') {
      navigate('/weaver/camera', { replace: true });
    }
  }, [state.currentUser, navigate]);

  useEffect(() => {
    if (!state.currentUser && sessionInfo && !autoRegistered.current) {
      autoRegistered.current = true;
      registerUser(sessionInfo.name, 'weaver')
        .then(() => navigate('/weaver/camera', { replace: true }))
        .catch((err) => {
          autoRegistered.current = false;
          setError(err instanceof Error ? err.message : 'Registration failed');
        });
    }
  }, [state.currentUser, sessionInfo, registerUser, navigate]);

  if (state.currentUser?.role === 'weaver') return null;
  if (sessionInfo && !state.currentUser) return null;

  const handleSubmit = async (name: string, emoji: string) => {
    try {
      setSessionInfo({ name, emoji });
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
