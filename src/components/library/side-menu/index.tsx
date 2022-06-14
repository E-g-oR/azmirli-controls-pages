import {FC, ReactNode} from "react";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SvgIcon,
    Toolbar
} from "@mui/material";
import {ROUTES} from "../../../utils/routing";

import SpaIcon from '@mui/icons-material/Spa';
import BusinessIcon from '@mui/icons-material/Business';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BlenderIcon from '@mui/icons-material/Blender';
import {useNavigate} from "react-router-dom";

const drawerWidth = 240;

interface MenuItem {
    name: string,
    icon: ReactNode,
    link: string,
}

const menu: ReadonlyArray<MenuItem> = [
    {
        icon: <BusinessIcon/>,
        link: ROUTES.cities,
        name: "Города"
    },
    {
        name: "Ароматы",
        link: ROUTES.flavors,
        icon: <SpaIcon/>
    },
    {
        name: "Адреса",
        link: ROUTES.addresses,
        icon: <ImportContactsIcon/>
    },
    {
        name: "Составы",
        link: ROUTES.structures,
        icon: <BlenderIcon/>
    }
]

const SideMenu: FC = () => {
    const navigate = useNavigate()

    return <div>
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List>
                    {menu.map(item => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton color={"secondary"} onClick={() => navigate(item.link)}>
                                <ListItemIcon>
                                    <SvgIcon color={"primary"}>
                                        {item.icon}
                                    </SvgIcon>
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>

                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </Box>
        </Drawer>
    </div>
}

export default SideMenu