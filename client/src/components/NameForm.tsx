import { useState } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';
import EmojiPicker from './EmojiPicker';
import { USER_EMOJIS } from '../theme/emojis';

interface Props {
  onSubmit: (name: string, emoji: string) => void;
  submitLabel?: string;
}

function NameForm({ onSubmit, submitLabel = 'Continue' }: Props) {
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const isValid = name.trim().length >= 2 && selectedEmoji.length > 0;

  return (
    <Stack spacing={3}>
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
        autoFocus
      />

      <Box>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          Select your icon
        </Typography>
        <EmojiPicker
          emojis={USER_EMOJIS}
          selected={selectedEmoji}
          onSelect={setSelectedEmoji}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={!isValid}
          onClick={() => onSubmit(name.trim(), selectedEmoji)}
        >
          {submitLabel}
        </Button>
      </Box>
    </Stack>
  );
}

export default NameForm;
