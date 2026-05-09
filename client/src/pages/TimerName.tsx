import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import NameForm from '../components/NameForm';
import { useGame } from '../contexts/GameContext';

function TimerName() {
  const navigate = useNavigate();
  const { state, registerUser, createTimer } = useGame();

  const handleSubmit = async (name: string) => {
    await registerUser(name, 'timer');
    if (state.timers.length === 0) {
      const DEFAULT_DURATION = 300;
      for (let i = 0; i < 4; i++) {
        await createTimer('', DEFAULT_DURATION);
      }
    }
    navigate('/timer/display');
  };

  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Timer' }]} />
      <Typography variant="h1" sx={{ mb: 3 }}>
        Timer
      </Typography>
      <NameForm onSubmit={handleSubmit} />
    </Box>
  );
}

export default TimerName;
