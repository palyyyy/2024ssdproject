import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue shade for primary buttons and components
    },
    secondary: {
      main: "#f50057", // Pink shade for accents
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h5: { fontSize: "1.5rem", fontWeight: 500 },
  },
});

export default theme;
