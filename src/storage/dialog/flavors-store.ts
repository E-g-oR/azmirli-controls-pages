import create from "zustand";
import {StoreDialog} from "./cities-store";
import {Flavor, UUID} from "thin-backend";
import {defaultVolumes, GroupedStores} from "../../components/editors/flavors/steps/step-2";
import {pipe} from "fp-ts/es6/function";
import * as A from "fp-ts/es6/ReadonlyArray"
import * as RR from "fp-ts/es6/ReadonlyRecord"
import * as O from "fp-ts/es6/Option"
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
    baseData: BaseData,
    setData: (baseData: BaseData) => void,
    // stores: IDsList,
    // setStores: (list: IDsList) => void,
    flavorsIDs: IDsList,
    setFlavorsIDs: (ids: IDsList) => void,
    getVolumesById: (id: UUID) => ReadonlyArray<string>,
    changeVolumes: (storeId: UUID, volumes: ReadonlyArray<string>) => void,
    selectedStores: GroupedStores,
    setSelectedStores: (stores: GroupedStores) => void,
    goNext: () => void,
    goBack: () => void,
}

export const useStoreCreateFlavor = create<CreateFlavorStore>((set, get) => ({
// export const useStoreCreateFlavor = create((set, get) => ({
    baseData: defaultBaseData,
    steps: ["Общие данные", "Доступные магазины", "Доступные объеы"],
    currentStep: 0,
    setData: baseData => set({baseData}),
    // stores: [],
    // setStores: stores => set({stores}),
    flavorsIDs: [],
    setFlavorsIDs: (flavorsIDs) => set({flavorsIDs}),
    selectedStores: {},
    changeVolumes: (storeId: UUID, volumes: ReadonlyArray<string>) => {
        const {selectedStores} = get()
        const newStores = pipe(
            selectedStores,
            RR.map(stores => pipe(
                stores,
                A.map(simpleStore => simpleStore.storeId === storeId ? {...simpleStore, volumes} : simpleStore)
            ))
        )
        return set({selectedStores: newStores})
    },
    getVolumesById: id => {
        const {selectedStores} = get()
        return pipe(
            selectedStores,
            RR.toEntries,
            A.map((tuple) => tuple[1]),
            A.flatten,
            A.findFirst(store => store.storeId === id),
            O.foldW(
                () => defaultVolumes,
                ({volumes}) => volumes ?? defaultVolumes,
            )
        )
    },
    setSelectedStores: selectedStores => set({selectedStores}),
    setCurrentStep: currentStep => set({currentStep}),
    goNext: () => {
        const {currentStep, steps, setCurrentStep} = get()
        return currentStep < steps.length && setCurrentStep(currentStep + 1)
    },
    goBack: () => {
        const currentStep = get().currentStep
        return currentStep > 0 && set({currentStep: currentStep - 1})
    }
}))