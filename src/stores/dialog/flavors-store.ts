import create from "zustand";
import {StoreDialog} from "./cities-store";
import {Flavor} from "thin-backend";

interface FlavorsStore extends StoreDialog {
    flavor: Flavor | null,
    setEditFlavor: (flavor: Flavor) => void,
    setCreateFlavor: () => void,
    setClose: () => void,
}

const useStoreFlavorsDialog = create<FlavorsStore>(set => ({
    isOpen: false,
    mode: "create",
    flavor: null,
    setIsOpen: isOpen => set({isOpen}),
    setMode: mode => set({mode}),
    setCreateFlavor: () => set({mode: "create", isOpen: true}),
    setEditFlavor: flavor => set({flavor, mode: "edit", isOpen: true}),
    setClose: ()=> set({isOpen: false, flavor: null, mode: "create"})
}))

export default useStoreFlavorsDialog