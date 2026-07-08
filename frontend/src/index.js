import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { WalletProvider } from "./context/WalletContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";
const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <WalletProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </WalletProvider>
    </React.StrictMode>
);