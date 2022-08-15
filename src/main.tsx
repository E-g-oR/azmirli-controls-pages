import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import CssBaseline from '@mui/material/CssBaseline';
import {
    responsiveFontSizes,
    Experimental_CssVarsProvider as CssVarsProvider,
    experimental_extendTheme as extendThemeMui
} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {ThinBackend} from "thin-backend-react";
import {initThinBackend} from 'thin-backend';
import {SnackbarProvider} from "notistack";
import {extendTheme} from "@mui/joy";
import {deepmerge} from "@mui/utils";

initThinBackend({host: import.meta.env.VITE_APP_BACKEND_URL});

const getBg = (opacity = 1) => `hsla(40, 40%, 55%, ${opacity})`
const getHoverBg = (opacity = 1) => `hsla(40, 40%, 45%, ${opacity})`
const getActiveBg = (opacity = 1) => `hsla(40, 40%, 40%, ${opacity})`

const themeJoy = extendTheme({
    cssVarPrefix: 'mui',
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    mainChannel: getBg(),
                    solidBg: getBg(),
                    solidHoverBg: getHoverBg(),
                    solidActiveBg: getActiveBg(),

                    plainColor: getActiveBg(),
                    plainHoverBg: getHoverBg(0.3),
                    plainActiveBg: getActiveBg(0.5),

                    outlinedColor: getActiveBg(),
                    outlinedBorder: getActiveBg(0.5),
                    outlinedHoverBg: getHoverBg(0.3),
                    outlinedHoverBorder: getHoverBg(0.7),
                    outlinedActiveBg: getActiveBg(0.5),

                    softColor: getActiveBg(),
                    softBg: getHoverBg(0.3),
                    softHoverBg: getHoverBg(0.5),
                    softActiveBg: getActiveBg(0.65),


                },
            }
        },
        dark: {
            palette: {
                primary: {
                    mainChannel: "#C0A365"
                }
            }
        }
    },
    components: {
        JoyButton: {
            defaultProps: {
                sx: {
                    textTransform: "uppercase",
                }
            }
        }
    }
})

export const themeMui = responsiveFontSizes(
    extendThemeMui({
        colorSchemes: {
            light: {
                palette: {
                    primary: {
                        main: "#C0A365"
                    }
                }
            }
        },
        // palette: {
        //     primary: {
        //         main: "#C0A365"
        //     },
        //     secondary: {
        //         main: "#01818C"
        //     },
        //     error: {
        //         main: "#EA6562"
        //     },
        //     text: {
        //         primary: "#08090E"
        //     },
        //     background: {
        //         paper: "#F7F7F6",
        //         default: "#fff"
        //     },
        // },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    // disableRipple: true,
                }
            }
        }
    })
)

const theme = deepmerge(themeJoy, themeMui)

const root = document.getElementById("root")
root && ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThinBackend requireLogin>
                {/*<ThemeProvider theme={theme}>*/}
                <CssVarsProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        <CssBaseline/>
                        <App/>
                    </SnackbarProvider>
                </CssVarsProvider>

                {/*</ThemeProvider>*/}
            </ThinBackend>
        </BrowserRouter>
    </React.StrictMode>
)
