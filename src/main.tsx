import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
// import './index.css'
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {ThinBackend} from "thin-backend-react";
import {initThinBackend} from 'thin-backend';
import {SnackbarProvider} from "notistack";


initThinBackend({host: import.meta.env.VITE_APP_BACKEND_URL});
export const theme = createTheme({
    palette: {
        primary: {
            main: "#C0A365"
        },
        secondary: {
            main: "#01818C"
        },
        error: {
            main: "#EA6562"
        },
        text: {
            primary: "#08090E"
        },
        background: {
            paper: "#F7F7F6",
            default: "#fff"
        },
    },
    components: {
        MuiListItemButton: {
            defaultProps: {},
            styleOverrides: {}
        },
        MuiTouchRipple: {
            defaultProps: {
                color: "red"
            }
        }

    }
})

const root = document.getElementById("root")
root && ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThinBackend requireLogin>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        <CssBaseline/>
                        <App/>
                    </SnackbarProvider>
                </ThemeProvider>
            </ThinBackend>
        </BrowserRouter>
    </React.StrictMode>
)
