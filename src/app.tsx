import {FC, useEffect, Suspense, lazy} from 'react'
import 'thin-backend-react/auth.css'
import useStoreCities from "./stores/cities";
import {useQuery} from "thin-backend-react";
import {query} from "thin-backend";
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "./utils/routing";
import AppLayout from "./components/library/layouts/app-layout";
// import ProtectedComponent from "./components/library/protected-component/protected-component";

const CitiesEditor = lazy(() => import("./components/editors/cities"))
const FlavorsEditor = lazy(() => import("./components/editors/flavors"))
const NotFound = lazy(() => import("./components/library/not-found"))
const AddressesEditor = lazy(() => import("./components/editors/addresses"))
const StructuresEditor = lazy(() => import("./components/editors/structures"))

const App: FC = () => {
    const setCities = useStoreCities(state => state.setCities)

    const requestCities = useQuery(query("cities"))

    useEffect(() => {
        setCities(requestCities)
    }, [requestCities, setCities])

    return <>
        <Suspense fallback={<div className={""}>Loading...</div>}>
            <Routes>
                <Route path={ROUTES.root} element={<AppLayout/>}>
                {/*<Route path={ROUTES.root} element={<ProtectedComponent>*/}
                {/*    <AppLayout/>*/}
                {/*</ProtectedComponent>}>*/}
                    <Route path={ROUTES.cities} element={<CitiesEditor/>}/>
                    <Route path={ROUTES.flavors} element={<FlavorsEditor/>}/>
                    <Route path={ROUTES.addresses} element={<AddressesEditor/>}/>
                    <Route path={ROUTES.structures} element={<StructuresEditor/>}/>
                    <Route path={ROUTES.notFound} element={<NotFound/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Route>
            </Routes>
        </Suspense>
    </>
}

export default App
