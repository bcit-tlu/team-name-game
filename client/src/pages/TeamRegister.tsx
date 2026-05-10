import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import PageHeader from '../components/PageHeader';
import EmojiPicker from '../components/EmojiPicker';
import { TEAM_EMOJIS } from '../theme/emojis';
import { useGame } from '../contexts/GameContext';

function TeamRegister() {
  const navigate = useNavigate();
  const { createTeam } = useGame();
  const [teamName, setTeamName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const isValid = teamName.trim().length > 0 && selectedEmoji.length > 0;

  const handleRegister = async () => {
    const team = await createTeam(teamName.trim(), selectedEmoji);
    navigate(`/teams/${team.id}`);
  };

  return (
    <Box>
      <PageHeader
        title="Register your team"
        description="Give your team a name and pick an icon."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Team Member', path: '/team-member' },
          { label: 'Teams', path: '/team-member/teams' },
          { label: 'Create' },
        ]}
      />

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isValid) handleRegister();
          }}
          variant="outlined"
          autoFocus
        />

        <Box>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Select a team icon
          </Typography>
          <EmojiPicker
            emojis={TEAM_EMOJIS}
            selected={selectedEmoji}
            onSelect={setSelectedEmoji}
            size={56}
            fontSize="1.875rem"
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!isValid}
            onClick={handleRegister}
          >
            Register team
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default TeamRegister;
