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
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../components/PageHeader';
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

  if (userTeam) return null;

  const handleJoinTeam = async (teamId: string) => {
    const team = await joinTeam(teamId);
    navigate(`/teams/${team.id}`);
  };

  return (
    <Box>
      <PageHeader
        title="Join or create a team"
        description="Pick an existing team or start a new one."
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Teams' }]}
      />

      <Stack spacing={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/team-member/register')}
        >
          Create new team
        </Button>

        {teams.length > 0 && (
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: 'text.secondary', mb: 1 }}
            >
              Or join an existing team
            </Typography>
            <List disablePadding>
              {teams.map((team) => (
                <ListItemButton
                  key={team.id}
                  onClick={() => handleJoinTeam(team.id)}
                  sx={{ py: 1.5, mb: 0.5 }}
                >
                  <ListItemAvatar>
                    <Typography component="span" sx={{ fontSize: '2rem' }}>
                      {team.icon}
                    </Typography>
                  </ListItemAvatar>
                  <ListItemText
                    primary={team.name}
                    primaryTypographyProps={{ variant: 'h3', component: 'span' }}
                    secondary={`${team.members.length} member${team.members.length !== 1 ? 's' : ''}`}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default TeamMemberTeams;
