import { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';

const USER_EMOJIS = [
  '🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐸', '🦋', '🌻', '🌲',
  '🍕', '🍔', '🌮', '🍩', '🍦', '🧁', '🍿', '☕', '🍉', '🍒',
  '✈️', '🚀', '🏖️', '⛰️', '🌋', '🗼', '🎡', '🏕️', '🌅', '🗺️',
  '💡', '🎸', '🔮', '🎯', '🧲', '🔑', '💎', '🎩', '📸', '🧸',
];

interface Props {
  onSubmit: (name: string, emoji: string) => void;
}

function NameForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const isValid = name.trim().length >= 2 && selectedEmoji.length > 0;

  return (
    <Box>
      <TextField
        fullWidth
        label="First name and last initial"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isValid) {
            onSubmit(name.trim(), selectedEmoji);
          }
        }}
        variant="outlined"
        sx={{ mb: 3, '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
      />

      <Typography variant="h3" sx={{ mb: 2 }}>
        Select Your Icon
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {USER_EMOJIS.map((emoji) => (
          <IconButton
            key={emoji}
            onClick={() => setSelectedEmoji(emoji)}
            sx={{
              fontSize: '1.8rem',
              width: 48,
              height: 48,
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
          onClick={() => onSubmit(name.trim(), selectedEmoji)}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Add Name
        </Button>
      </Box>
    </Box>
  );
}

export default NameForm;
