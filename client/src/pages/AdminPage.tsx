import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useGame } from '../contexts/GameContext';

function AdminPage() {
  const { resetGame } = useGame();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleReset = () => {
    resetGame();
    setConfirmOpen(false);
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Admin
      </Typography>

      <Typography variant="body2" sx={{ mb: 4, color: '#9F8B7B' }}>
        Version {__APP_VERSION__}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Reset all game data including teams, entries, abilities, and timers.
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={() => setConfirmOpen(true)}
        sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
      >
        Reset Game
      </Button>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will delete all teams, entries, abilities, and reset all timers. This cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPage;
