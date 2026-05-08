import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    // In production, this would create a GitHub issue via API
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    setSubmitted(true);
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Feedback
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={8}
        placeholder="Share your thoughts..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        variant="outlined"
        sx={{ mb: 3, '& .MuiInputBase-input': { fontSize: '1.1rem' } }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!feedback.trim()}
          onClick={handleSubmit}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Submit
        </Button>
      </Box>

      <Snackbar open={submitted} autoHideDuration={3000} onClose={() => setSubmitted(false)}>
        <Alert severity="success" onClose={() => setSubmitted(false)}>
          Feedback submitted! Thank you.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FeedbackPage;
