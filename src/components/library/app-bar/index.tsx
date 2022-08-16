import {FC} from "react";
import {AppBar as TopBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import useStoreMenu from "../../../storage/menu";

const AppBar: FC = () => {
    const isOpen = useStoreMenu(state => state.isOpen)
    const setIsOpen = useStoreMenu(state => state.setOpen)
    const navigationType = useStoreMenu(state => state.type)

    return <Box>
        <TopBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar
                sx={{
                    alignItems: "center",
                }}
            >
                {
                    navigationType === "side-menu" && <IconButton
                        edge={"start"}
                        sx={{marginRight: 3}}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu/>
                    </IconButton>
                }

                <Typography variant={"h6"} noWrap component={"h6"}>
                    Админ панель Azmirli
                </Typography>
            </Toolbar>
        </TopBar>
    </Box>
}

export default AppBar