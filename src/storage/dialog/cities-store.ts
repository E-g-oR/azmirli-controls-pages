import create from "zustand";
import {City} from "thin-backend";

export type Mode = "edit" | "create"

export interface StoreDialog {
    isOpen: boolean,
    mode: Mode,
    setMode: (mode: Mode) => void,
    setIsOpen: (isOpen: boolean) => void,
}

interface CitiesStore extends StoreDialog {
    city: City | null,
    setCity: (city: City) => void,
    setEditCity: (city: City) => void,
    setCreateCity: () => void,
}

const useStoreDialogCity = create<CitiesStore>(set => ({
    city: null,
    isOpen: false,
    mode: "create",
    setCity: city => set({city}),
    setIsOpen: isOpen => set({isOpen}),
    setMode: mode => set({mode}),
    setEditCity: city => set({city, mode: "edit", isOpen: true}),
    setCreateCity: () => set({mode: "create", isOpen: true, city: null}),
}))

export default useStoreDialogCity