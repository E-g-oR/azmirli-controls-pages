import create from "zustand";
import {City, UUID} from "thin-backend";
import {pipe} from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray"
import * as O from "fp-ts/Option"
import {identity} from "rxjs";


const getCity = (key: keyof City, value: string) => (cities: ReadonlyArray<City>): City | null => pipe(
    cities,
    A.findFirst(city => city?.[key] === value),
    O.foldW(
        () => null,
        identity
    )
)

interface StoreCities {
    cities: ReadonlyArray<City> | null,
    setCities: (cities: ReadonlyArray<City> | null) => void,
    getCityByName: (name: string) => City | null,
    getCityById: (cityId: UUID) => City | null,
    getCityBySubdomain: (subdomain: string) => City | null,
}

const useStoreCities = create<StoreCities>((setState, getState) => ({
    cities: null,
    setCities: cities => setState({cities}),
    getCityBySubdomain: subdomain => pipe(
        getState(),
        ({cities}) => cities ? cities : [],
        getCity("subDomain", subdomain)
    ),
    getCityById: cityId => pipe(
        getState(),
        ({cities}) => cities ? cities : [],
        getCity("id", cityId)
    ),
    getCityByName: name => pipe(
        getState(),
        ({cities}) => cities ? cities : [],
        getCity("name", name)
    )
}))

export default useStoreCities