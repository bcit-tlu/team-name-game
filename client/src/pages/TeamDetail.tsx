import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PageHeader from '../components/PageHeader';
import AbilityBadge from '../components/AbilityBadge';
import { useGame } from '../contexts/GameContext';

function StatTile({
  count,
  label,
  icon,
  color,
}: {
  count: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        py: 2,
        px: 1,
        textAlign: 'center',
      }}
    >
      <Box sx={{ color, mb: 0.5 }}>{icon}</Box>
      <Typography variant="h2" sx={{ color, fontWeight: 700 }}>
        {count}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Paper>
  );
}

function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const { state } = useGame();
  const { teams, users, currentUser } = state;

  const team = teams.find((t) => t.id === teamId);

  if (!team) {
    return (
      <Box sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Team not found.
        </Typography>
      </Box>
    );
  }

  const memberUsers = team.members
    .map((memberId) => users.find((u) => u.id === memberId))
    .filter(Boolean);

  const isOnTeam = currentUser ? team.members.includes(currentUser.id) : false;

  return (
    <Box>
      <PageHeader title={`${team.icon} ${team.name}`} />

      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
        <StatTile
          count={team.approvedCount}
          label="Approved"
          icon={<CheckCircleIcon sx={{ fontSize: 44 }} />}
          color="success.main"
        />
        <StatTile
          count={team.rejectedCount}
          label="Rejected"
          icon={<CancelIcon sx={{ fontSize: 44 }} />}
          color="error.main"
        />
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Members
        </Typography>
        {memberUsers.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            No members yet.
          </Typography>
        ) : (
          <List disablePadding>
            {memberUsers.map((member) => (
              <ListItem key={member!.id} disablePadding sx={{ py: 0.5 }}>
                <ListItemAvatar>
                  {member!.icon ? (
                    <Avatar
                      sx={{
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        width: 44,
                        height: 44,
                        fontSize: '1.375rem',
                      }}
                    >
                      {member!.icon}
                    </Avatar>
                  ) : (
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        width: 44,
                        height: 44,
                        fontSize: '1.125rem',
                      }}
                    >
                      {member!.name.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={member!.name}
                  primaryTypographyProps={{ variant: 'body1' }}
                  secondary={
                    isOnTeam && currentUser?.id === member!.id ? 'You' : undefined
                  }
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {team.abilitiesEarned.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Abilities earned
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {team.abilitiesEarned.map((ability, idx) => (
              <AbilityBadge key={idx} ability={ability} variant="filled" />
            ))}
          </Box>
        </Box>
      )}

      {isOnTeam && (
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mt: 4, textAlign: 'center' }}
        >
          To leave this team, open your profile from the avatar in the top right.
        </Typography>
      )}
    </Box>
  );
}

export default TeamDetail;
