import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // This sets the theme to dark mode
    primary: {
      main: '#90caf9', // Customize primary color
    },
    secondary: {
      main: '#f48fb1', // Customize secondary color
    },
    background: {
      default: '#121212', // Background color for the app
      paper: '#1d1d1d', // Background color for cards, modals, etc.
    },
    text: {
      primary: '#ffffff', // Text color for primary content
      secondary: '#b0bec5', // Text color for secondary content
    },
  },
});

export default darkTheme;
