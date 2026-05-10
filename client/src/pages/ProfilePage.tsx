import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PageHeader from '../components/PageHeader';
import EditProfileForm from '../components/EditProfileForm';
import { useGame } from '../contexts/GameContext';
import { useSession } from '../contexts/SessionContext';

function formatRole(role: string): string {
  return role
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function ProfilePage() {
  const navigate = useNavigate();
  const { state, removeRole, leaveTeam } = useGame();
  const { sessionInfo, setSessionInfo } = useSession();
  const { currentUser, teams } = state;
  const [editing, setEditing] = useState(false);

  const userTeam = currentUser
    ? teams.find((t) => t.members.includes(currentUser.id))
    : undefined;

  const handleRemoveRole = async () => {
    await removeRole();
    navigate('/');
  };

  const handleLeaveTeam = async () => {
    if (!userTeam) return;
    await leaveTeam(userTeam.id);
  };

  const handleSaveEdit = (name: string, emoji: string) => {
    setSessionInfo({ name, emoji });
    setEditing(false);
  };

  const displayName = sessionInfo?.name ?? currentUser?.name ?? '';
  const displayEmoji = sessionInfo?.emoji ?? '';

  return (
    <Box>
      <PageHeader title="Profile" />

      {editing ? (
        <EditProfileForm
          initialName={displayName}
          initialEmoji={displayEmoji}
          onSave={handleSaveEdit}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              p: 2.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                width: 56,
                height: 56,
                fontSize: '1.5rem',
              }}
            >
              {displayEmoji || displayName.charAt(0).toUpperCase() || '?'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Name
              </Typography>
              <Typography variant="h3" sx={{ wordBreak: 'break-word' }}>
                {displayName || 'Not set'}
              </Typography>
            </Box>
            <IconButton
              aria-label="Edit profile"
              onClick={() => setEditing(true)}
              sx={{ color: 'text.secondary' }}
            >
              <EditIcon />
            </IconButton>
          </Paper>

          {currentUser ? (
            <Paper
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 2.5,
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Role
              </Typography>
              <Typography variant="h3">{formatRole(currentUser.role)}</Typography>

              {userTeam && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Team
                  </Typography>
                  <Typography variant="h3">
                    {userTeam.icon} {userTeam.name}
                  </Typography>
                </>
              )}

              <Stack spacing={1.5} sx={{ mt: 2.5 }}>
                {userTeam && (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<GroupRemoveIcon />}
                    onClick={handleLeaveTeam}
                  >
                    Leave team
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={handleRemoveRole}
                >
                  Sign out of role
                </Button>
              </Stack>
            </Paper>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No role selected yet. Go to the home screen to pick a role.
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
}

export default ProfilePage;
