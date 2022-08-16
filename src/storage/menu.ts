import create from "zustand";

type NavigationType = "side-menu" | "bottom-navigation"
export const bottomNavigationId: NavigationType = "bottom-navigation"
export const sideMenuId: NavigationType = "side-menu"

interface StoreMenu {
    isOpen: boolean,
    type: NavigationType,
    setOpen: (isOpen: boolean) => void,
    close: () => void,
    open: () => void,
    setNavigationType: (type: NavigationType) => void,
}

const useStoreMenu = create<StoreMenu>(setState => ({
    isOpen: true,
    type: "side-menu",
    setOpen: isOpen => setState({isOpen}),
    close: () => setState({isOpen: false}),
    open: () => setState({isOpen: true}),
    setNavigationType: type => setState({type}),
}))

export default useStoreMenu