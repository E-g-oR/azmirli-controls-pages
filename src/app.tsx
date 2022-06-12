import {FC} from 'react'
import './App.css'
import {Box} from "@mui/material";
import SideMenu from "./components/library/side-menu";
import AppBar from "./components/library/app-bar";

const App: FC = () => {

    return (
        <Box sx={{display: "flex"}}>
            <AppBar/>
            <SideMenu/>
        </Box>
    )
}

export default App
