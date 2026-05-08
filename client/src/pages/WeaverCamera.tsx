import { Box, Typography, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Breadcrumbs from '../components/Breadcrumbs';

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
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Weaver', path: '/weaver' },
          { label: 'Camera' },
        ]}
      />

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <IconButton
          onClick={handleCameraClick}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            width: 120,
            height: 120,
            borderRadius: 3,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <CameraAltIcon sx={{ fontSize: 64 }} />
        </IconButton>
        <Typography variant="h2" sx={{ mt: 3, fontSize: '1.5rem' }}>
          Take a picture of the game board
        </Typography>
      </Box>
    </Box>
  );
}

export default WeaverCamera;
