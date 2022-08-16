import create from "zustand";
import {StoreDialog} from "./cities-store";
import {Flavor} from "thin-backend";

interface FlavorsStore extends StoreDialog {
    flavor: Flavor | null,
    setFlavor: (flavor: Flavor | null) => void,
    setEditFlavor: (flavor: Flavor) => void,
    setCreateFlavor: () => void,
    steps: number,
    currentStep: number,
    setStep: (step: number) => void,
}

const useStoreFlavorsDialog = create<FlavorsStore>((set) => ({
    isOpen: false,
    mode: "create",
    flavor: null,
    steps: 3,
    currentStep: 1,
    setIsOpen: isOpen => set({isOpen}),
    setMode: mode => set({mode}),
    setFlavor: flavor => set({flavor}),
    setCreateFlavor: () => set({flavor: null, mode: "create", isOpen: true}),
    setEditFlavor: flavor => set({flavor, mode: "edit", isOpen: true}),
    setStep: step => set({currentStep: step})
}))

export default useStoreFlavorsDialog