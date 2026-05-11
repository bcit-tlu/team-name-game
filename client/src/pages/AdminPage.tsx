import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from '@mui/material';
import PageHeader from '../components/PageHeader';
import { useGame } from '../contexts/GameContext';
import { useSession } from '../contexts/SessionContext';

const SERVER_URL = (import.meta.env.VITE_SERVER_URL || 'http://localhost:3001').replace(
  /\/+$/,
  '',
);

function AdminPage() {
  const navigate = useNavigate();
  const { resetGame } = useGame();
  const { clearSessionInfo } = useSession();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [runtimeVersion, setRuntimeVersion] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${SERVER_URL}/api/version`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { version: string | null } | null) => {
        if (!cancelled && data?.version) {
          setRuntimeVersion(data.version);
        }
      })
      .catch(() => {
        // Fall back to build-time __APP_VERSION__
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleReset = () => {
    resetGame();
    clearSessionInfo();
    setConfirmOpen(false);
    navigate('/');
  };

  return (
    <Box>
      <PageHeader
        title="Admin"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Admin' }]}
      />

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2.5,
          mb: 3,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          Reset game
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
          Clears all teams, entries, abilities, and timers. This cannot be undone.
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => setConfirmOpen(true)}
        >
          Reset game
        </Button>
      </Paper>

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Version {runtimeVersion ?? __APP_VERSION__}
      </Typography>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Reset game?</DialogTitle>
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
