import { Box, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Fab from '@mui/material/Fab';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGame } from '../contexts/GameContext';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function TimerDisplay() {
  const { state, startTimer, stopTimer, resetTimer, updateTimerLabel, createTimer } = useGame();

  const handleToggleTimer = (timerId: string, isRunning: boolean) => {
    if (isRunning) {
      stopTimer(timerId);
    } else {
      startTimer(timerId);
    }
  };

  const handleAddTimer = () => {
    createTimer('', 300);
  };

  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Timer', path: '/timer' },
          { label: 'Display' },
        ]}
      />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Timers
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.timers.map((timer) => (
          <Box
            key={timer.id}
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Timer label"
              value={timer.label}
              onChange={(e) => updateTimerLabel(timer.id, e.target.value)}
              sx={{ flex: 1, '& .MuiInputBase-input': { fontSize: '1.1rem' } }}
            />
            <Tooltip title={timer.isRunning ? 'Stop' : 'Start'}>
              <IconButton
                onClick={() => handleToggleTimer(timer.id, timer.isRunning)}
                sx={{ color: timer.isRunning ? 'primary.main' : 'grey.500' }}
              >
                <AccessTimeIcon sx={{ fontSize: 36 }} />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem',
                minWidth: 50,
                color: timer.remaining <= 60 && timer.isRunning ? 'error.main' : 'text.primary',
              }}
            >
              {formatTime(timer.remaining)}
            </Typography>
            <Tooltip title="Reset">
              <IconButton onClick={() => resetTimer(timer.id)} sx={{ color: 'grey.500' }}>
                <RestartAltIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Box>
        ))}
      </Box>

      <Box sx={{ position: 'fixed', bottom: 80, right: 24 }}>
        <Fab color="primary" onClick={handleAddTimer} size="medium">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default TimerDisplay;
