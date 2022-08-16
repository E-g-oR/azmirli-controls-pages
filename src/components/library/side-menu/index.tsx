import {FC} from "react";
import {
    Box,
    CSSObject,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    SvgIcon,
    Theme,
    Toolbar,
    useTheme
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer"
import {useNavigate, useLocation} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {sideMenuId} from "../../../storage/menu";
import {MenuItem} from "../navigation";
import {createPortal} from "react-dom";

const drawerWidth = 240;


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

interface Props {
    menu: ReadonlyArray<MenuItem>,
    open?: boolean,
}

const SideMenu: FC<Props> = ({menu, open}) => {
    const node = document.getElementById(sideMenuId)
    const navigate = useNavigate()
    const theme = useTheme()
    const location = useLocation()

    return node && createPortal(
        <Box>
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
                                    selected={location.pathname.includes(item.link)}
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
                                            color={location.pathname.includes(item.link) ? "primary" : "inherit"}
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
        </Box>, node)
}

export default SideMenu