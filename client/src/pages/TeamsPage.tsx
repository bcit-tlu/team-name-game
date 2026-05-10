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
  Stack,
} from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import GavelIcon from '@mui/icons-material/Gavel';
import PageHeader from '../components/PageHeader';
import { useGame, Role } from '../contexts/GameContext';

const ROLE_ICONS: Record<Exclude<Role, 'team-member'>, React.ReactNode> = {
  adjudicator: <GavelIcon fontSize="small" />,
  timer: <HourglassEmptyIcon fontSize="small" />,
  weaver: <CameraAltIcon fontSize="small" />,
};

const ROLE_LABELS: Record<Exclude<Role, 'team-member'>, string> = {
  adjudicator: 'Adjudicators',
  timer: 'Timer',
  weaver: 'Weaver',
};

function PersonRow({
  name,
  emoji,
  icon,
}: {
  name: string;
  emoji?: string;
  icon: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.75 }}>
      {emoji ? (
        <Avatar
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            width: 36,
            height: 36,
            fontSize: '1.125rem',
          }}
        >
          {emoji}
        </Avatar>
      ) : (
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 36,
            height: 36,
            fontSize: '0.9rem',
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
      )}
      <Typography variant="body1">{name}</Typography>
      <Box sx={{ ml: 'auto', color: 'text.secondary', display: 'flex' }}>{icon}</Box>
    </Box>
  );
}

function RoleSection({
  role,
  users,
}: {
  role: Exclude<Role, 'team-member'>;
  users: { id: string; name: string; icon?: string }[];
}) {
  if (users.length === 0) return null;
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 0.5 }}>
        {ROLE_LABELS[role]}
      </Typography>
      {users.map((user) => (
        <PersonRow
          key={user.id}
          name={user.name}
          emoji={user.icon}
          icon={ROLE_ICONS[role]}
        />
      ))}
    </Box>
  );
}

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
      <PageHeader
        title="Teams & Roles"
        description="See who's playing and the teams in this round."
      />

      {isTeamMember && !userTeam && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={() => navigate('/team-member/teams')}
          sx={{ mb: 3 }}
        >
          Join or create a team
        </Button>
      )}

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 0.5 }}>
            Teams
          </Typography>
          {state.teams.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No teams registered yet.
            </Typography>
          ) : (
            <List disablePadding>
              {state.teams.map((team) => (
                <ListItemButton
                  key={team.id}
                  onClick={() => handleTeamClick(team.id)}
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

        <RoleSection role="adjudicator" users={adjudicators} />
        <RoleSection role="timer" users={timers} />
        <RoleSection role="weaver" users={weavers} />
      </Stack>
    </Box>
  );
}

export default TeamsPage;
