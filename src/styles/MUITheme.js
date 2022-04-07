import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    card: { main: "#18161E" },
    primary: {
      contrastText: "#FFFFFF",
      main: "#36454f",
      light: "#736d83",
      dark: "#1e252b",
      orange: "orange",
    },
    secondary: {
      main: "#000000",
    },
    text: {
      primary: "#ffffff",
      faded: "#ffffffBF",
      faded2: "#ffffff66",
      faded3: "#ffffff33",
    },
    textField: {
      background: "#ffffff",
    },
    switch: {
      primary: "#154A6799",
    },
    box: {
      primary: "#154A6799",
    },
    type: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    card: { main: "#18161E" },
    primary: {
      main: "#36454f",
      light: "#B3B1B1",
      dark: "#1e252b",
    },
    secondary: {
      main: "#FFA500",
    },
    text: {
      primary: "#000000",
      faded: "#000000BF",
      faded2: "#00000066",
    },
    textField: {
      background: "#B3B1B1",
    },
    switch: {
      primary: "#154A6799",
    },
    box: {
      primary: "#154A6799",
    },
    type: "light",
  },
});

export { darkTheme, lightTheme };
