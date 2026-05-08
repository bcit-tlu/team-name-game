import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItemButton, ListItem, ListItemText, ListItemAvatar, Divider } from '@mui/material';
import { useGame } from '../contexts/GameContext';

function TeamsPage() {
  const navigate = useNavigate();
  const { state } = useGame();
  const isAdjudicator = state.currentUser?.role === 'adjudicator';

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
          {state.teams.map((team, idx) => {
            const content = (
              <>
                <ListItemAvatar>
                  <Typography sx={{ fontSize: '2rem' }}>{team.icon}</Typography>
                </ListItemAvatar>
                <ListItemText
                  primary={team.name}
                  primaryTypographyProps={{ fontSize: '1.3rem', fontWeight: 500 }}
                />
              </>
            );

            return (
              <Box key={team.id}>
                {isAdjudicator ? (
                  <ListItemButton
                    onClick={() => navigate(`/adjudicator/review/${team.id}`)}
                    sx={{ py: 2 }}
                  >
                    {content}
                  </ListItemButton>
                ) : (
                  <ListItem sx={{ py: 2 }}>{content}</ListItem>
                )}
                {idx < state.teams.length - 1 && <Divider />}
              </Box>
            );
          })}
        </List>
      )}
    </Box>
  );
}

export default TeamsPage;
