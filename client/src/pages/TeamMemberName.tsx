import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
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
        .catch(() => { autoRegistered.current = false; });
    }
  }, [currentUser, sessionInfo, registerUser, navigate]);

  if (currentUser && (userTeam || currentUser.role === 'team-member')) return null;
  if (sessionInfo && !currentUser) return null;

  const handleSubmit = async (name: string, emoji: string) => {
    setSessionInfo({ name, emoji });
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
