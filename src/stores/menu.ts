import create from "zustand";

interface StoreMenu {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void,
    close: () => void,
    open: () => void,
}

const useStoreMenu = create<StoreMenu>(setState => ({
    isOpen: true,
    setOpen: isOpen => setState({isOpen}),
    close: () => setState({isOpen: false}),
    open: () => setState({isOpen: true})
}))

export default useStoreMenu