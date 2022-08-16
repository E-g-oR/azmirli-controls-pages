import create from "zustand";
import {StoreDialog} from "./cities-store";
import {Store} from "thin-backend";

type Stores = ReadonlyArray<Store> | null

interface StoresStore extends StoreDialog {
    currentStore: Store | null,
    setCurrentStore: (currentStore: Store | null) => void,
    stores: Stores,
    setStores: (stores: Stores) => void,
    clearCurrentStore: () => void,
    // setCurrentStore: ()=> void,
}

const useStoreStores = create<StoresStore>((setState) => ({
    isOpen: false,
    mode: "create",
    stores: null,
    currentStore: null,
    setIsOpen: isOpen => setState({isOpen}),
    setStores: stores => setState({stores}),
    setMode: mode => setState({mode}),
    setCurrentStore: currentStore => setState({currentStore, mode: "edit"}),
    clearCurrentStore: () => setState({currentStore: null, mode: "create"}),

}))

export default useStoreStores