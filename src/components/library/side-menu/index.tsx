import {FC, ReactNode, useEffect} from "react";
import {
    Box, CSSObject,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, styled,
    SvgIcon, Theme,
    Toolbar, useMediaQuery, useTheme
} from "@mui/material";
import {ROUTES} from "../../../utils/routing";
import MuiDrawer from "@mui/material/Drawer"
import SpaIcon from '@mui/icons-material/Spa';
import BusinessIcon from '@mui/icons-material/Business';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BlenderIcon from '@mui/icons-material/Blender';
import {useNavigate, useLocation} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import useStoreMenu from "../../../stores/menu";

const drawerWidth = 240;

interface MenuItem {
    name: string,
    icon: ReactNode,
    link: string,
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 2px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7)} + 2px)`,
    },
});

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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SideMenu: FC = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("lg"))
    const location = useLocation()
    const open = useStoreMenu(state => state.isOpen)
    const setOpen = useStoreMenu(state => state.setOpen)

    useEffect(() => {
        matches && setOpen(false)
    }, [matches])

    return <Box>
        <CssBaseline/>
        {/*<AppBar/>*/}
        <Drawer
            open={open}
            variant="permanent"
        >
            <Toolbar/>
            <Box sx={{overflowX: 'hidden'}}>
                <List>
                    {menu.map(item => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(item.link)}
                                color={theme.palette.primary.main}
                                selected={location.pathname === item.link}
                                sx={{
                                    justifyContent: open ? 'initial' : 'center',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SvgIcon
                                        color={location.pathname === item.link ? "primary" : "inherit"}
                                    >
                                        {item.icon}
                                    </SvgIcon>
                                </ListItemIcon>
                                <ListItemText
                                    sx={{
                                        transition: theme.transitions.create(["opacity", "margin"], {
                                            easing: theme.transitions.easing.sharp,
                                            duration: theme.transitions.duration.leavingScreen,
                                        }),
                                        ml: open ? 3 : 0,
                                        opacity: open ? 1 : 0,
                                    }}
                                    primary={item.name}
                                />
                            </ListItemButton>


                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </Box>
        </Drawer>
    </Box>
}

export default SideMenu