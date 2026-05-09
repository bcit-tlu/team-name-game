import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItemButton, ListItemText, ListItemAvatar, Divider } from '@mui/material';
import { useGame } from '../contexts/GameContext';

function TeamsPage() {
  const navigate = useNavigate();
  const { state } = useGame();
  const isAdjudicator = state.currentUser?.role === 'adjudicator';

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
        Registered Teams
      </Typography>

      {state.teams.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'grey.500', mt: 4, textAlign: 'center' }}>
          No teams registered yet.
        </Typography>
      ) : (
        <List>
          {state.teams.map((team, idx) => (
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
              {idx < state.teams.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
}

export default TeamsPage;
