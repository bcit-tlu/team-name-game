import { Box, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
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
      <Typography variant="h1" sx={{ mb: 2 }}>
        Timers
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, color: '#9F8B7B', fontSize: '1rem' }}>
        Click the timer icon to start the countdown
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {state.timers.map((timer) => {
          const isCompleted = timer.remaining <= 0;
          const isPaused = !timer.isRunning && timer.remaining > 0 && timer.remaining < timer.duration;

          let timerIcon;
          let timerColor: string;
          let tooltipText: string;

          if (isCompleted) {
            timerIcon = <LocalFireDepartmentIcon sx={{ fontSize: 36 }} />;
            timerColor = '#d32f2f';
            tooltipText = 'Completed – Reset to restart';
          } else if (timer.isRunning) {
            timerIcon = <AccessTimeIcon sx={{ fontSize: 36 }} />;
            timerColor = '#837061';
            tooltipText = 'Pause';
          } else if (isPaused) {
            timerIcon = <PauseCircleOutlineIcon sx={{ fontSize: 36 }} />;
            timerColor = '#9A9682';
            tooltipText = 'Resume';
          } else {
            timerIcon = <AccessTimeIcon sx={{ fontSize: 36 }} />;
            timerColor = '#9F8B7B';
            tooltipText = 'Start';
          }

          return (
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
              <Tooltip title={tooltipText}>
                <span style={{ display: 'inline-flex' }}>
                  <IconButton
                    onClick={() => !isCompleted && handleToggleTimer(timer.id, timer.isRunning)}
                    sx={{ color: timerColor }}
                    disabled={isCompleted}
                  >
                    {timerIcon}
                  </IconButton>
                </span>
              </Tooltip>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  minWidth: 50,
                  color: isCompleted ? 'error.main' : timer.remaining <= 60 && timer.isRunning ? 'error.main' : 'text.primary',
                }}
              >
                {formatTime(timer.remaining)}
              </Typography>
              <Tooltip title="Reset">
                <IconButton onClick={() => resetTimer(timer.id)} sx={{ color: '#9F8B7B' }}>
                  <RestartAltIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        })}
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
