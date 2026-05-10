import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useGame } from '../contexts/GameContext';
import { useSession } from '../contexts/SessionContext';

const USER_EMOJIS = [
  '🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐸', '🦋', '🌻', '🌲',
  '🍕', '🍔', '🌮', '🍩', '🍦', '🧁', '🍿', '☕', '🍉', '🍒',
  '✈️', '🚀', '🏖️', '⛰️', '🌋', '🗼', '🎡', '🏕️', '🌅', '🗺️',
  '💡', '🎸', '🔮', '🎯', '🧲', '🔑', '💎', '🎩', '📸', '🧸',
];

function ProfilePage() {
  const navigate = useNavigate();
  const { state, removeRole, leaveTeam } = useGame();
  const { sessionInfo, setSessionInfo } = useSession();
  const { currentUser, teams } = state;
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('');

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

  const handleStartEdit = () => {
    setEditName(sessionInfo?.name ?? currentUser?.name ?? '');
    setEditEmoji(sessionInfo?.emoji ?? '');
    setEditing(true);
  };

  const handleSaveEdit = () => {
    if (editName.trim().length >= 2 && editEmoji.length > 0) {
      setSessionInfo({ name: editName.trim(), emoji: editEmoji });
      setEditing(false);
    }
  };

  if (!currentUser) {
    return (
      <Box sx={{ pt: 2 }}>
        <Typography variant="h1" sx={{ mb: 3, fontSize: '1.8rem' }}>
          Profile
        </Typography>
        {sessionInfo && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontSize: '2rem', mb: 1 }}>
              {sessionInfo.emoji}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
              {sessionInfo.name}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleStartEdit}
              sx={{ mt: 2, textTransform: 'none', fontSize: '1rem' }}
            >
              Change Name &amp; Icon
            </Button>
          </Box>
        )}
        <Typography variant="body1" sx={{ color: '#9F8B7B', fontSize: '1.1rem' }}>
          No role selected yet. Go to the home screen to pick a role.
        </Typography>

        {editing && (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="First name and last initial"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              variant="outlined"
              sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
            />
            <Typography variant="h3" sx={{ mb: 1 }}>Select Your Icon</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {USER_EMOJIS.map((emoji) => (
                <IconButton
                  key={emoji}
                  onClick={() => setEditEmoji(emoji)}
                  sx={{
                    fontSize: '1.8rem', width: 48, height: 48,
                    border: editEmoji === emoji ? '2px solid' : '2px solid transparent',
                    borderColor: editEmoji === emoji ? 'primary.main' : 'transparent',
                    borderRadius: 2,
                  }}
                >
                  {emoji}
                </IconButton>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleSaveEdit}
                disabled={editName.trim().length < 2 || editEmoji.length === 0}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  const roleName = currentUser.role
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h1" sx={{ mb: 3, fontSize: '1.8rem' }}>
        Profile
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#9F8B7B' }}>
          Name
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
            {sessionInfo?.emoji && `${sessionInfo.emoji} `}{currentUser.name}
          </Typography>
          <IconButton size="small" onClick={handleStartEdit}>
            <EditIcon sx={{ fontSize: 20, color: '#9F8B7B' }} />
          </IconButton>
        </Box>
      </Box>

      {editing && (
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="First name and last initial"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            variant="outlined"
            sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
          />
          <Typography variant="h3" sx={{ mb: 1 }}>Select Your Icon</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {USER_EMOJIS.map((emoji) => (
              <IconButton
                key={emoji}
                onClick={() => setEditEmoji(emoji)}
                sx={{
                  fontSize: '1.8rem', width: 48, height: 48,
                  border: editEmoji === emoji ? '2px solid' : '2px solid transparent',
                  borderColor: editEmoji === emoji ? 'primary.main' : 'transparent',
                  borderRadius: 2,
                }}
              >
                {emoji}
              </IconButton>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleSaveEdit}
              disabled={editName.trim().length < 2 || editEmoji.length === 0}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={() => setEditing(false)}>Cancel</Button>
          </Box>
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#9F8B7B' }}>
          Role
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
          {roleName}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleRemoveRole}
          sx={{ mt: 2, textTransform: 'none', fontSize: '1rem' }}
        >
          Remove Role
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#9F8B7B' }}>
          Team
        </Typography>
        {userTeam ? (
          <>
            <Typography variant="h6" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
              {userTeam.icon} {userTeam.name}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleLeaveTeam}
              sx={{ mt: 2, textTransform: 'none', fontSize: '1rem' }}
            >
              Leave Team
            </Button>
          </>
        ) : (
          <Typography variant="h6" sx={{ fontSize: '1.4rem', color: '#9F8B7B' }}>
            Not on a team
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;
