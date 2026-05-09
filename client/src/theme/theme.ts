import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#9F8B7B',
      main: '#9A9682',
      dark: '#837061',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#837061',
    },
    background: {
      default: '#F3F5F5',
      paper: '#F3F5F5',
    },
    text: {
      primary: '#3C3F47',
      secondary: '#3C3F47',
    },
    divider: '#9F8B7B',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#3C3F47',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#3C3F47',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#3C3F47',
    },
    body1: {
      fontSize: '1.2rem',
      color: '#3C3F47',
    },
    body2: {
      fontSize: '1rem',
      color: '#3C3F47',
    },
    button: {
      fontSize: '1.1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: 4,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});
