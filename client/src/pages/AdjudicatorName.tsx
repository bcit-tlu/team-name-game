import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import PageHeader from '../components/PageHeader';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';
import { useSession } from '../contexts/SessionContext';

function AdjudicatorName() {
  const navigate = useNavigate();
  const { state, registerUser } = useGame();
  const { sessionInfo, setSessionInfo } = useSession();
  const autoRegistered = useRef(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.currentUser?.role === 'adjudicator') {
      navigate('/adjudicator/teams', { replace: true });
    }
  }, [state.currentUser, navigate]);

  useEffect(() => {
    if (!state.currentUser && sessionInfo && !autoRegistered.current) {
      autoRegistered.current = true;
      registerUser(sessionInfo.name, 'adjudicator', sessionInfo.emoji)
        .then(() => navigate('/adjudicator/teams', { replace: true }))
        .catch((err) => {
          autoRegistered.current = false;
          setError(err instanceof Error ? err.message : 'Registration failed');
        });
    }
  }, [state.currentUser, sessionInfo, registerUser, navigate]);

  if (state.currentUser?.role === 'adjudicator') return null;
  if (sessionInfo && !state.currentUser) return null;

  const handleSubmit = async (name: string, emoji: string) => {
    try {
      await registerUser(name, 'adjudicator', emoji);
      setSessionInfo({ name, emoji });
      navigate('/adjudicator/teams');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <Box>
      <PageHeader
        title="Adjudicator"
        description="Add your name and pick an icon to represent you."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Adjudicator' }]}
      />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default AdjudicatorName;
