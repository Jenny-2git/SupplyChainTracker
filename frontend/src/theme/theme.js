import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#14B8A6",
    },

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#DC2626",
    },

    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "'Inter', sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  components: {

    MuiCard: {

      styleOverrides: {

        root: {

          borderRadius: 18,

          transition: "0.3s",

          boxShadow:
            "0px 5px 20px rgba(0,0,0,0.08)",

          "&:hover": {

            transform: "translateY(-4px)",

            boxShadow:
              "0px 10px 30px rgba(37,99,235,0.15)"

          }

        }

      }

    },

    MuiButton: {

      styleOverrides: {

        root: {

          borderRadius: 12,

          padding: "10px 20px",

          transition: ".3s"

        }

      }

    }

  }

});

export default theme;