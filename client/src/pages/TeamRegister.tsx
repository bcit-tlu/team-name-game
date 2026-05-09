import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGame } from '../contexts/GameContext';

const EMOJIS = {
  city: ['🏙️', '🌆', '🏛️', '🏢', '⛩️'],
  nature: ['🌲', '🌊', '🏔️', '🌺', '🦋'],
  sports: ['⚽', '🏀', '🎾', '🏈', '⚾'],
};

function TeamRegister() {
  const navigate = useNavigate();
  const { createTeam } = useGame();
  const [teamName, setTeamName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const allEmojis = [...EMOJIS.city, ...EMOJIS.nature, ...EMOJIS.sports];
  const isValid = teamName.trim().length > 0 && selectedEmoji.length > 0;

  const handleRegister = async () => {
    const team = await createTeam(teamName.trim(), selectedEmoji);
    navigate(`/teams/${team.id}`);
  };

  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Team Member', path: '/team-member' },
          { label: 'Teams', path: '/team-member/teams' },
          { label: 'Create' },
        ]}
      />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Register Your Team
      </Typography>

      <TextField
        fullWidth
        label="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isValid) {
            handleRegister();
          }
        }}
        variant="outlined"
        sx={{ mb: 3, '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
      />

      <Typography variant="h3" sx={{ mb: 2 }}>
        Select an Emoji
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {allEmojis.map((emoji) => (
          <IconButton
            key={emoji}
            onClick={() => setSelectedEmoji(emoji)}
            sx={{
              fontSize: '2rem',
              width: 56,
              height: 56,
              border: selectedEmoji === emoji ? '2px solid' : '2px solid transparent',
              borderColor: selectedEmoji === emoji ? 'primary.main' : 'transparent',
              borderRadius: 2,
            }}
          >
            {emoji}
          </IconButton>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!isValid}
          onClick={handleRegister}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default TeamRegister;
