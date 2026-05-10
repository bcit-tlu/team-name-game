import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import PageHeader from '../components/PageHeader';
import { useGame } from '../contexts/GameContext';

function AdjudicatorTeams() {
  const navigate = useNavigate();
  const { state } = useGame();

  return (
    <Box>
      <PageHeader
        title="Select a team"
        description="Tap a team to review their entries."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Teams' }]}
      />

      {state.teams.length === 0 ? (
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mt: 4, textAlign: 'center' }}
        >
          No teams registered yet. Waiting for teams to join…
        </Typography>
      ) : (
        <List disablePadding>
          {state.teams.map((team) => (
            <ListItemButton
              key={team.id}
              onClick={() => navigate(`/adjudicator/review/${team.id}`)}
              sx={{ py: 1.5, mb: 0.5 }}
            >
              <ListItemAvatar>
                <Typography component="span" sx={{ fontSize: '1.75rem' }}>
                  {team.icon}
                </Typography>
              </ListItemAvatar>
              <ListItemText
                primary={team.name}
                primaryTypographyProps={{ variant: 'h3', component: 'span' }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}

export default AdjudicatorTeams;
