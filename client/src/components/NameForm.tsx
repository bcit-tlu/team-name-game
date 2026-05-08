import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface Props {
  onSubmit: (name: string) => void;
}

function NameForm({ onSubmit }: Props) {
  const [name, setName] = useState('');

  const isValid = name.trim().length >= 2;

  return (
    <Box>
      <TextField
        fullWidth
        label="First name and last initial"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        sx={{ mb: 3, '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!isValid}
          onClick={() => onSubmit(name.trim())}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Add Name
        </Button>
      </Box>
    </Box>
  );
}

export default NameForm;
