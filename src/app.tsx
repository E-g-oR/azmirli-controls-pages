import {FC} from 'react'
import {Box, Toolbar} from "@mui/material"
import SideMenu from "./components/library/side-menu"
import AppBar from "./components/library/app-bar"
import Root from "./root"
import 'thin-backend-react/auth.css'
import "thin-backend-components/crud.css"

const App: FC = () => {

    return (
        <>
            <Box sx={{display: "flex", position: "relative"}}>
                <AppBar/>
                <SideMenu/>
                <Box component="main" sx={{flexGrow: 1, p: 3, position: "relative"}}>
                    <Toolbar/>
                    <Root/>
                </Box>

            </Box>
        </>

    )
}

export default App
