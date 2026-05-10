import { useRef, useState } from 'react';
import { Box, Typography, TextField, IconButton, Tooltip, Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Fab from '@mui/material/Fab';
import PageHeader from '../components/PageHeader';
import { useGame } from '../contexts/GameContext';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface TimerVisual {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  tooltip: string;
}

function getTimerVisual(timer: {
  isRunning: boolean;
  remaining: number;
  duration: number;
}): TimerVisual {
  const isCompleted = timer.remaining <= 0;
  const isPaused =
    !timer.isRunning && timer.remaining > 0 && timer.remaining < timer.duration;

  if (isCompleted) {
    return {
      icon: <LocalFireDepartmentIcon sx={{ fontSize: 32 }} />,
      color: 'error.main',
      bgColor: 'transparent',
      tooltip: 'Completed — reset to restart',
    };
  }
  if (timer.isRunning) {
    return {
      icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
      color: 'primary.contrastText',
      bgColor: 'primary.dark',
      tooltip: 'Pause',
    };
  }
  if (isPaused) {
    return {
      icon: <PauseCircleOutlineIcon sx={{ fontSize: 32 }} />,
      color: 'primary.contrastText',
      bgColor: 'primary.main',
      tooltip: 'Resume',
    };
  }
  return {
    icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
    color: 'text.secondary',
    bgColor: 'transparent',
    tooltip: 'Start',
  };
}

function TimerDisplay() {
  const { state, startTimer, stopTimer, resetTimer, updateTimerLabel, createTimer } = useGame();
  const [labelErrors, setLabelErrors] = useState<Record<string, boolean>>({});
  const labelRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleToggleTimer = (timerId: string, isRunning: boolean, label: string) => {
    if (!isRunning && label.trim().length === 0) {
      setLabelErrors((prev) => ({ ...prev, [timerId]: true }));
      labelRefs.current[timerId]?.focus();
      return;
    }
    if (isRunning) stopTimer(timerId);
    else startTimer(timerId);
  };

  const handleLabelChange = (timerId: string, value: string) => {
    updateTimerLabel(timerId, value);
    if (value.trim().length > 0 && labelErrors[timerId]) {
      setLabelErrors((prev) => {
        const next = { ...prev };
        delete next[timerId];
        return next;
      });
    }
  };

  const handleAddTimer = () => {
    createTimer('', 300);
  };

  return (
    <Box>
      <PageHeader
        title="Timers"
        description="Tap a timer's clock to start, pause, or resume the countdown."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Timers' },
        ]}
      />

      <Stack spacing={1.5}>
        {state.timers.map((timer) => {
          const visual = getTimerVisual(timer);
          const isCompleted = timer.remaining <= 0;
          const isLowTime = timer.remaining <= 60 && timer.isRunning;
          const hasLabelError = !!labelErrors[timer.id];

          return (
            <Box
              key={timer.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <TextField
                  inputRef={(el: HTMLInputElement | null) => {
                    labelRefs.current[timer.id] = el;
                  }}
                  variant="outlined"
                  size="small"
                  placeholder="Timer label"
                  value={timer.label}
                  onChange={(e) => handleLabelChange(timer.id, e.target.value)}
                  fullWidth
                  error={hasLabelError}
                  helperText={hasLabelError ? 'Add a label to start this timer.' : undefined}
                />
              </Box>
              <Tooltip title={visual.tooltip}>
                <span style={{ display: 'inline-flex' }}>
                  <IconButton
                    onClick={() =>
                      !isCompleted &&
                      handleToggleTimer(timer.id, timer.isRunning, timer.label)
                    }
                    aria-label={visual.tooltip}
                    disabled={isCompleted}
                    sx={{
                      width: 44,
                      height: 44,
                      mt: 0.25,
                      color: visual.color,
                      bgcolor: visual.bgColor,
                      borderRadius: '50%',
                      border: '1.5px solid',
                      borderColor: visual.bgColor === 'transparent' ? 'divider' : 'transparent',
                      '&:hover': {
                        bgcolor:
                          visual.bgColor === 'transparent' ? 'action.hover' : visual.bgColor,
                        opacity: visual.bgColor === 'transparent' ? 1 : 0.85,
                      },
                    }}
                  >
                    {visual.icon}
                  </IconButton>
                </span>
              </Tooltip>
              <Typography
                variant="h3"
                sx={{
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: 56,
                  textAlign: 'right',
                  mt: 1,
                  color: isCompleted || isLowTime ? 'error.main' : 'text.primary',
                }}
              >
                {formatTime(timer.remaining)}
              </Typography>
              <Tooltip title="Reset">
                <IconButton
                  onClick={() => resetTimer(timer.id)}
                  aria-label="Reset timer"
                  sx={{ color: 'text.secondary', mt: 0.25 }}
                >
                  <RestartAltIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        })}
      </Stack>

      <Box sx={{ position: 'fixed', bottom: 80, right: 24 }}>
        <Tooltip title="Add timer">
          <Fab color="primary" onClick={handleAddTimer} size="medium" aria-label="Add timer">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default TimerDisplay;
