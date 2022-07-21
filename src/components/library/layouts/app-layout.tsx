import {FC, Suspense} from "react";
import AppBar from "../app-bar";
import {bottomNavigationId, sideMenuId} from "../../../stores/menu";
import {Box, Toolbar} from "@mui/material";
import Navigation from "../navigation";
import {Outlet} from "react-router-dom";

const AppLayout: FC = () => <>
    <Box
        sx={{
            display: "flex",
            position: "relative"
        }}
    >
        <AppBar/>
        <Navigation/>
        <div id={sideMenuId}/>
        <Box
            sx={{
                flexGrow: 1,
                p: 3,
                position: "relative",
                width: "100%",
            }}
        >
            <Box component={"main"}>
                <Toolbar/>
                <Suspense fallback={<div>Loading...</div>} >
                    <Outlet/>
                </Suspense>

            </Box>
            <div id={bottomNavigationId}/>
        </Box>

    </Box>
</>

export default AppLayout

