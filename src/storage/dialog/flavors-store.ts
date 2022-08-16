import create from "zustand";
import {StoreDialog} from "./cities-store";
import {Flavor, UUID} from "thin-backend";
import {IDsList} from "../../components/editors/flavors";

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
    setCreateFlavor: () => set({flavor: null, mode: "create", isOpen: true}),
    setEditFlavor: flavor => set({flavor, mode: "edit", isOpen: true}),
}))

export default useStoreFlavorsDialog

type VolumesT = Record<UUID, Array<number>>

export interface BaseData {
    articleNumber: string,
    brand: string,
    category: string,
    name: string,
    sex: string,
}

export const defaultBaseData: BaseData = {
    articleNumber: "",
    brand: "",
    category: "lux",
    name: "",
    sex: "unisex",
}

interface CreateFlavorStore {
    currentStep: number,
    steps: ReadonlyArray<string>,
    setCurrentStep: (step: number) => void,
    baseData: Partial<BaseData>,
    setData: (data: Partial<BaseData>) => void,
    stores: IDsList,
    setStores: (list: IDsList) => void,
    volumes: VolumesT,
    setVolumes: (volumes: VolumesT) => void,
    goNext: () => void,
    goBack: () => void,
}

export const useStoreCreateFlavor = create<CreateFlavorStore>((set, get) => ({
    baseData: defaultBaseData,
    steps: ["Общие данные", "Доступные магазины", "Доступные объеы"],
    currentStep: 0,
    setData: data => set({baseData: {...data}}),
    stores: [],
    setStores: stores => set({stores}),
    volumes: {},
    setVolumes: volumes => set({volumes}),
    setCurrentStep: currentStep => set({currentStep}),
    goNext: () => {
        const {currentStep, steps} = get()
        return currentStep < steps.length && set({currentStep: currentStep + 1})
    },
    goBack: () => {
        const currentStep = get().currentStep
        return currentStep > 0 && set({currentStep: currentStep - 1})
    }
}))