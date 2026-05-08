import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItemButton, ListItemText, ListItemAvatar, Divider } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGame } from '../contexts/GameContext';

function AdjudicatorTeams() {
  const navigate = useNavigate();
  const { state } = useGame();

  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Adjudicator', path: '/adjudicator' },
          { label: 'Teams' },
        ]}
      />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Select a Team
      </Typography>

      {state.teams.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'grey.500', mt: 4, textAlign: 'center' }}>
          No teams registered yet. Waiting for teams to join...
        </Typography>
      ) : (
        <List>
          {state.teams.map((team, idx) => (
            <Box key={team.id}>
              <ListItemButton
                onClick={() => navigate(`/adjudicator/review/${team.id}`)}
                sx={{ py: 2 }}
              >
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

export default AdjudicatorTeams;
