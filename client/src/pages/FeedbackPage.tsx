import { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, Link } from '@mui/material';
import { useSession } from '../contexts/SessionContext';

const SERVER_URL = (import.meta.env.VITE_SERVER_URL || 'http://localhost:3001').replace(/\/+$/, '');

function FeedbackPage() {
  const { sessionInfo } = useSession();
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
    issueUrl?: string;
  }>({ open: false, severity: 'success', message: '' });

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setSubmitting(true);

    try {
      const resp = await fetch(`${SERVER_URL}/api/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: feedback.trim(),
          userName: sessionInfo?.name ?? 'Anonymous',
        }),
      });

      const data = (await resp.json()) as {
        issueUrl?: string;
        error?: string;
      };

      if (resp.ok && data.issueUrl) {
        setFeedback('');
        setResult({
          open: true,
          severity: 'success',
          message: 'Feedback submitted! Thank you.',
          issueUrl: data.issueUrl,
        });
      } else {
        setResult({
          open: true,
          severity: 'error',
          message: data.error ?? 'Failed to submit feedback.',
        });
      }
    } catch {
      setResult({
        open: true,
        severity: 'error',
        message: 'Failed to submit feedback. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
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
          disabled={!feedback.trim() || submitting}
          onClick={handleSubmit}
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>

      <Snackbar
        open={result.open}
        autoHideDuration={result.issueUrl ? 10000 : 4000}
        onClose={() => setResult((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={result.severity}
          onClose={() => setResult((prev) => ({ ...prev, open: false }))}
        >
          {result.message}
          {result.issueUrl && (
            <>
              {' '}
              <Link href={result.issueUrl} target="_blank" rel="noopener">
                View issue
              </Link>
            </>
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FeedbackPage;
