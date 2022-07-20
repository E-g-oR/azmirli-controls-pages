import {FC, useEffect} from 'react'
import {Box, Toolbar} from "@mui/material"
import AppBar from "./components/library/app-bar"
import Root from "./root"
import 'thin-backend-react/auth.css'
import useStoreCities from "./stores/cities";
import {useQuery} from "thin-backend-react";
import {query} from "thin-backend";
import Navigation from "./components/library/navigation";
import {bottomNavigationId, sideMenuId} from "./stores/menu";

const App: FC = () => {
    const setCities = useStoreCities(state => state.setCities)

    const requestCities = useQuery(query("cities"))

    useEffect(() => {
        setCities(requestCities)
    }, [requestCities, setCities])

    return <>
        <Box
            sx={{
                display: "flex",
                position: "relative"
            }}
        >
            <AppBar/>
            <div id={sideMenuId}/>
            <Box
                component={"main"}
                sx={{
                    flexGrow: 1,
                    p: 3,
                    position: "relative",
                    width: "100%",
                }}
            >
                <Toolbar/>
                <Root/>
                <div id={bottomNavigationId}/>
            </Box>
            <Navigation/>
        </Box>
    </>
}

export default App
