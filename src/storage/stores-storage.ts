import {Store, UUID} from "thin-backend";
import create from "zustand";
import {pipe} from "fp-ts/es6/function";
import * as A from "fp-ts/es6/ReadonlyArray"
import * as O from "fp-ts/es6/Option"
import {identity} from "rxjs";

interface StoresStorage {
    stores: ReadonlyArray<Store>,
    setStores: (stores: ReadonlyArray<Store>) => void,
    getStoreById: (id: UUID) => Store | undefined,
}

const useStoreStoresStorage = create<StoresStorage>((set, get) => ({
    stores: [],
    setStores: stores => set({stores}),
    getStoreById: id => pipe(
        get(),
        ({stores}) => pipe(
            stores,
            A.findFirst(store => store.id === id),
            O.foldW(
                () => undefined,
                identity
            )
        )
    )
}))

export default useStoreStoresStorage