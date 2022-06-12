import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
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
        }
    }
})

const root = document.getElementById("root")
root && ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>

    </React.StrictMode>
)
