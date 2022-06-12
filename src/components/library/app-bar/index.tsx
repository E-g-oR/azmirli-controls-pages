import {FC} from "react";
import {AppBar as TopBar, Toolbar, Typography} from "@mui/material";

const AppBar: FC = ()=> {
    return <div>
        <TopBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Clipped drawer
                </Typography>
            </Toolbar>
        </TopBar>
    </div>
}

export default AppBar