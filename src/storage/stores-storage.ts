import {Store} from "thin-backend";
import create from "zustand";

interface StoresStorage {
    stores: ReadonlyArray<Store> | null ,
    setStores: (stores: ReadonlyArray<Store> | null) => void,

}

const useStoreStoresStorage = create<StoresStorage>((set)=>({
    stores: null,
    setStores: stores => set({stores}),
}))

export default useStoreStoresStorage