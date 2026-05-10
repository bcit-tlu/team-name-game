import { createTheme } from '@mui/material/styles';

/**
 * Design system — Team Name Game
 *
 * A warm, taupe-based palette with WCAG 2.0 AA contrast for body text
 * (>= 4.5:1) and UI elements (>= 3:1) on the cream surface.
 *
 * Type scale is constrained to six sizes:
 *   h1 (page title) · h2 (section) · h3 (subsection) · body1 · body2 · button
 *
 * Spacing follows MUI's 8px grid; the design tokens use:
 *   xs=1 (8px) · sm=2 (16px) · md=3 (24px) · lg=4 (32px) · xl=6 (48px)
 */

const palette = {
  taupe: {
    50: '#F5F1EC',
    100: '#EAE2D6',
    200: '#D9CFC2',
    300: '#BFAF9C',
    400: '#A99887',
    500: '#8A7660',
    600: '#6B5847',
    700: '#4A3D32',
    800: '#2A2520',
  },
  ink: {
    primary: '#2A2520',
    secondary: '#5C5147',
    muted: '#6B5847',
  },
  status: {
    success: '#2E7D32',
    error: '#B71C1C',
    warning: '#8A5A00',
    info: '#1565C0',
  },
} as const;

declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      sunken: string;
      raised: string;
    };
  }
  interface PaletteOptions {
    surface?: {
      sunken: string;
      raised: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: palette.taupe[400],
      main: palette.taupe[600],
      dark: palette.taupe[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: palette.taupe[300],
      main: palette.taupe[500],
      dark: palette.taupe[700],
      contrastText: '#FFFFFF',
    },
    success: {
      main: palette.status.success,
      contrastText: '#FFFFFF',
    },
    error: {
      main: palette.status.error,
      contrastText: '#FFFFFF',
    },
    warning: {
      main: palette.status.warning,
      contrastText: '#FFFFFF',
    },
    info: {
      main: palette.status.info,
      contrastText: '#FFFFFF',
    },
    background: {
      default: palette.taupe[50],
      paper: '#FFFFFF',
    },
    surface: {
      sunken: palette.taupe[100],
      raised: '#FFFFFF',
    },
    text: {
      primary: palette.ink.primary,
      secondary: palette.ink.secondary,
      disabled: palette.taupe[400],
    },
    divider: palette.taupe[200],
    action: {
      hover: 'rgba(74, 61, 50, 0.06)',
      selected: 'rgba(74, 61, 50, 0.10)',
      disabled: palette.taupe[300],
      disabledBackground: palette.taupe[100],
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.625rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '1.3125rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: { fontSize: '1.3125rem', fontWeight: 600, lineHeight: 1.3 },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    },
    subtitle2: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 },
    body1: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1.0625rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.taupe[50],
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*:focus-visible': {
          outline: `2px solid ${palette.taupe[700]}`,
          outlineOffset: 2,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          paddingLeft: 24,
          paddingRight: 24,
          minHeight: 52,
        },
        sizeLarge: {
          minHeight: 60,
          fontSize: '1.125rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': { borderWidth: 1.5 },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'primary',
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid ${palette.taupe[700]}`,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          padding: 4,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.3125rem',
          fontWeight: 600,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: `1px solid ${palette.taupe[200]}`,
          height: 76,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: palette.ink.muted,
          minWidth: 72,
          paddingTop: 8,
          '&.Mui-selected': {
            color: palette.taupe[700],
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.875rem',
            fontWeight: 500,
            marginTop: 4,
            '&.Mui-selected': {
              fontSize: '0.875rem',
              fontWeight: 600,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          '& fieldset': {
            borderColor: palette.taupe[200],
          },
          '&:hover fieldset': {
            borderColor: palette.taupe[400],
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.taupe[700],
            borderWidth: 2,
          },
        },
        input: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: palette.ink.secondary,
          '&.Mui-focused': {
            color: palette.taupe[700],
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: palette.taupe[100],
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.taupe[200],
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          color: palette.ink.muted,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.ink.secondary,
          '&:hover': {
            backgroundColor: 'rgba(74, 61, 50, 0.08)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '1.0625rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.taupe[800],
          fontSize: '0.9375rem',
        },
        arrow: {
          color: palette.taupe[800],
        },
      },
    },
  },
});

export const tokens = {
  palette,
} as const;
