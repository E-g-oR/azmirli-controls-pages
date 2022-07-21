import {FC, ReactNode, useEffect} from "react";
import {useMediaQuery, useTheme} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import {ROUTES} from "../../../utils/routing";
import SpaIcon from "@mui/icons-material/Spa";
import BlenderIcon from "@mui/icons-material/Blender";
import SideMenu from "../side-menu";
import useStoreMenu from "../../../stores/menu";
import BottomNavigation from "../bottom-navigation";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

export interface MenuItem {
    name: string,
    icon: ReactNode,
    link: string,
}

export const menu: ReadonlyArray<MenuItem> = [
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
        name: "Магазины",
        link: ROUTES.addresses,
        icon: <ShoppingBag/>
    },
    {
        name: "Составы",
        link: ROUTES.structures,
        icon: <BlenderIcon/>
    }
]

const Navigation: FC = () => {
    const theme = useTheme()
    const closeSideMenu = useMediaQuery(theme.breakpoints.down("lg"))
    const showBottomNavigation = useMediaQuery(theme.breakpoints.down("md"))
    const isOpen = useStoreMenu(state => state.isOpen)
    const open = useStoreMenu(state => state.open)
    const close = useStoreMenu(state => state.close)
    const setNavigationType = useStoreMenu(state => state.setNavigationType)
    const navigationType = useStoreMenu(state => state.type)

    useEffect(() => {
        closeSideMenu ? close() : open()
    }, [closeSideMenu, close, open])

    useEffect(() => {
        showBottomNavigation ? setNavigationType("bottom-navigation") : setNavigationType("side-menu")
    }, [showBottomNavigation])

    return navigationType === "bottom-navigation" ?
        <BottomNavigation menu={menu}/>
        : <SideMenu menu={menu} open={isOpen}/>
}

export default Navigation