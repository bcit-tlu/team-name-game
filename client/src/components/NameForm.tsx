import { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';

const USER_EMOJIS = {
  'Animals & Nature': ['🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐸', '🦋', '🌻', '🌲'],
  'Food & Drink': ['🍕', '🍔', '🌮', '🍩', '🍦', '🧁', '🍿', '☕', '🍉', '🍒'],
  'Travel & Places': ['✈️', '🚀', '🏖️', '⛰️', '🌋', '🗼', '🎡', '🏕️', '🌅', '🗺️'],
  Objects: ['💡', '🎸', '🔮', '🎯', '🧲', '🔑', '💎', '🎩', '📸', '🧸'],
};

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
      {Object.entries(USER_EMOJIS).map(([category, emojis]) => (
        <Box key={category} sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#9F8B7B', mb: 1, fontSize: '0.9rem' }}>
            {category}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {emojis.map((emoji) => (
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
        </Box>
      ))}

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
