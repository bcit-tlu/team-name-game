import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGame } from '../contexts/GameContext';

function TeamMemberTeams() {
  const navigate = useNavigate();
  const { state, joinTeam } = useGame();
  const { currentUser, teams } = state;

  const userTeam = currentUser
    ? teams.find((t) => t.members.includes(currentUser.id))
    : undefined;

  useEffect(() => {
    if (userTeam) {
      navigate(`/teams/${userTeam.id}`, { replace: true });
    }
  }, [userTeam, navigate]);

  const handleJoinTeam = async (teamId: string) => {
    const team = await joinTeam(teamId);
    navigate(`/teams/${team.id}`);
  };

  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Team Member', path: '/team-member' },
          { label: 'Teams' },
        ]}
      />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Join or Create a Team
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate('/team-member/register')}
        sx={{ py: 2, fontSize: '1.2rem', fontWeight: 600, mb: 4 }}
      >
        Create New Team
      </Button>

      {teams.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2, fontSize: '1.2rem', color: '#9F8B7B' }}>
            Or join an existing team
          </Typography>
          <List>
            {teams.map((team) => (
              <ListItemButton
                key={team.id}
                onClick={() => handleJoinTeam(team.id)}
                sx={{ py: 2 }}
              >
                <ListItemAvatar>
                  <Typography sx={{ fontSize: '2rem' }}>{team.icon}</Typography>
                </ListItemAvatar>
                <ListItemText
                  primary={team.name}
                  secondary={`${team.members.length} member${team.members.length !== 1 ? 's' : ''}`}
                  primaryTypographyProps={{ fontSize: '1.3rem', fontWeight: 500 }}
                />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}

export default TeamMemberTeams;
