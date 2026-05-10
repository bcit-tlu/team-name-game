import { Box, Typography, Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PageHeader from '../components/PageHeader';

function WeaverCamera() {
  const handleCameraClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.click();
  };

  return (
    <Box>
      <PageHeader
        title="Weaver"
        description="Capture the game board so everyone can review the round."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Weaver', path: '/weaver' },
          { label: 'Camera' },
        ]}
      />

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          onClick={handleCameraClick}
          variant="contained"
          size="large"
          startIcon={<CameraAltIcon />}
          sx={{ px: 4 }}
        >
          Take a picture
        </Button>
        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          Opens your device camera to capture the current board.
        </Typography>
      </Box>
    </Box>
  );
}

export default WeaverCamera;
