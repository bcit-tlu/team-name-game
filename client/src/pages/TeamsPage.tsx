import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useGame } from '../contexts/GameContext';

function TeamsPage() {
  const navigate = useNavigate();
  const { state } = useGame();
  const isAdjudicator = state.currentUser?.role === 'adjudicator';
  const isTeamMember = state.currentUser?.role === 'team-member';
  const userTeam = state.currentUser
    ? state.teams.find((t) => t.members.includes(state.currentUser!.id))
    : undefined;

  const adjudicators = state.users.filter((u) => u.role === 'adjudicator');
  const timers = state.users.filter((u) => u.role === 'timer');
  const weavers = state.users.filter((u) => u.role === 'weaver');

  const handleTeamClick = (teamId: string) => {
    if (isAdjudicator) {
      navigate(`/adjudicator/review/${teamId}`);
    } else {
      navigate(`/teams/${teamId}`);
    }
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Teams & Roles
      </Typography>

      {isTeamMember && !userTeam && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => navigate('/team-member/teams')}
          sx={{ py: 2, fontSize: '1.1rem', fontWeight: 600, mb: 3 }}
        >
          Join or Create a Team
        </Button>
      )}

      <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem', color: '#9F8B7B' }}>
        Teams
      </Typography>

      {state.teams.length === 0 ? (
        <Typography variant="body1" sx={{ color: '#9F8B7B', mb: 3 }}>
          No teams registered yet.
        </Typography>
      ) : (
        <List sx={{ mb: 2 }}>
          {state.teams.map((team) => (
            <Box key={team.id}>
              <ListItemButton onClick={() => handleTeamClick(team.id)} sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Typography sx={{ fontSize: '2rem' }}>{team.icon}</Typography>
                </ListItemAvatar>
                <ListItemText
                  primary={team.name}
                  primaryTypographyProps={{ fontSize: '1.3rem', fontWeight: 500 }}
                />
              </ListItemButton>
            </Box>
          ))}
        </List>
      )}

      <Divider sx={{ mb: 2 }} />

      <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem', color: '#9F8B7B' }}>
        Adjudicators
      </Typography>

      {adjudicators.length === 0 ? (
        <Typography variant="body2" sx={{ color: '#9F8B7B', mb: 2 }}>
          No adjudicators registered.
        </Typography>
      ) : (
        <List sx={{ mb: 2 }}>
          {adjudicators.map((user) => (
            <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', py: 1, px: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '1rem' }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <Typography sx={{ fontSize: '1.1rem' }}>{user.name}</Typography>
            </Box>
          ))}
        </List>
      )}

      {timers.length > 0 && (
        <Box sx={{ mb: 1.5 }}>
          {timers.map((user) => (
            <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.5 }}>
              <PersonIcon sx={{ color: 'primary.main', fontSize: 24 }} />
              <Typography sx={{ fontSize: '1.1rem' }}>
                Timer: {user.name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {weavers.length > 0 && (
        <Box sx={{ mb: 1.5 }}>
          {weavers.map((user) => (
            <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.5 }}>
              <PersonIcon sx={{ color: 'primary.main', fontSize: 24 }} />
              <Typography sx={{ fontSize: '1.1rem' }}>
                Weaver: {user.name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default TeamsPage;
