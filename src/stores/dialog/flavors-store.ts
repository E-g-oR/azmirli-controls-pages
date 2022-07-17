import create from "zustand";
import {StoreDialog} from "./cities-store";
import {Flavor} from "thin-backend";

interface FlavorsStore extends StoreDialog {
    flavor: Flavor | null,
    setFlavor: (flavor: Flavor | null) => void,
    setEditFlavor: (flavor: Flavor) => void,
    setCreateFlavor: () => void,
}

const useStoreFlavorsDialog = create<FlavorsStore>((set) => ({
    isOpen: false,
    mode: "create",
    flavor: null,
    setIsOpen: isOpen => set({isOpen}),
    setMode: mode => set({mode}),
    setFlavor: flavor => set({flavor}),
    setCreateFlavor: () => set({mode: "create", isOpen: true}),
    setEditFlavor: flavor => set({flavor, mode: "edit", isOpen: true}),
}))

export default useStoreFlavorsDialog