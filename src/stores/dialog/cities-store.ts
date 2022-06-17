import create from "zustand";
import {City} from "thin-backend";

export type Mode = "edit" | "create"

interface CitiesStore {
    isOpen: boolean,
    city: City | null,
    mode: Mode,
    setCity: (city: City) => void,
    setMode: (mode: Mode) => void,
    setIsOpen: (isOpen: boolean) => void,
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