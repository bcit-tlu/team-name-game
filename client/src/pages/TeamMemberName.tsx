import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';
import { useSession } from '../contexts/SessionContext';

function TeamMemberName() {
  const navigate = useNavigate();
  const { state, registerUser } = useGame();
  const { sessionInfo, setSessionInfo } = useSession();
  const { currentUser, teams } = state;
  const autoRegistered = useRef(false);

  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!currentUser && sessionInfo && !autoRegistered.current) {
      autoRegistered.current = true;
      registerUser(sessionInfo.name, 'team-member')
        .then(() => navigate('/team-member/teams', { replace: true }))
        .catch((err) => {
          autoRegistered.current = false;
          setError(err instanceof Error ? err.message : 'Registration failed');
        });
    }
  }, [currentUser, sessionInfo, registerUser, navigate]);

  if (currentUser && (userTeam || currentUser.role === 'team-member')) return null;
  if (sessionInfo && !currentUser) return null;

  const handleSubmit = async (name: string, emoji: string) => {
    try {
      await registerUser(name, 'team-member');
      setSessionInfo({ name, emoji });
      navigate('/team-member/teams');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Team Member' }]} />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Team Member
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default TeamMemberName;
