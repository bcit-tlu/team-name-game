import { useState } from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import EmojiPicker from './EmojiPicker';
import { USER_EMOJIS } from '../theme/emojis';

interface Props {
  initialName: string;
  initialEmoji: string;
  onSave: (name: string, emoji: string) => void;
  onCancel: () => void;
}

function EditProfileForm({ initialName, initialEmoji, onSave, onCancel }: Props) {
  const [name, setName] = useState(initialName);
  const [emoji, setEmoji] = useState(initialEmoji);

  const isValid = name.trim().length >= 2 && emoji.length > 0;

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="First name and last initial"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        autoFocus
      />
      <Box>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          Select your icon
        </Typography>
        <EmojiPicker emojis={USER_EMOJIS} selected={emoji} onSelect={setEmoji} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" disabled={!isValid} onClick={() => onSave(name.trim(), emoji)}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}

export default EditProfileForm;
