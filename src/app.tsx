import {FC, useEffect, Suspense, lazy} from 'react'
import 'thin-backend-react/auth.css'
import useStoreCities from "./stores/cities";
import {useQuery} from "thin-backend-react";
import {query, } from "thin-backend";
import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "./utils/routing";
// import AppLayout from "./components/library/layouts/app-layout";
import LoadingScreen from "./components/loading-screen/loading-screen";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion"
// import ProtectedComponent from "./components/library/protected-component/protected-component";

const AppLayout = lazy(() => import("./components/library/layouts/app-layout"))
const CitiesEditor = lazy(() => import("./components/editors/cities"))
const FlavorsEditor = lazy(() => import("./components/editors/flavors"))
const NotFound = lazy(() => import("./components/library/not-found"))
// const AddressesEditor = lazy(() => import("./components/editors/addresses"))
const StructuresEditor = lazy(() => import("./components/editors/structures"))
const StoresEditor = lazy(() => import("./components/editors/stores/stores-table"))

const App: FC = () => {
    const setCities = useStoreCities(state => state.setCities)

    const requestCities = useQuery(query("cities"))

    useEffect(() => {
        setCities(requestCities)
    }, [requestCities, setCities])

    return <>
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <Suspense fallback={<LoadingScreen/>}>
                    <Routes>
                        <Route path={ROUTES.root} element={<AppLayout/>}>
                            {/*<Route path={ROUTES.root} element={<ProtectedComponent>*/}
                            {/*    <AppLayout/>*/}
                            {/*</ProtectedComponent>}>*/}
                            <Route index element={<Navigate to={ROUTES.cities} />}/>
                            <Route path={ROUTES.cities} element={<CitiesEditor/>}/>
                            <Route path={ROUTES.flavors} element={<FlavorsEditor/>}/>
                            <Route path={ROUTES.stores} element={<StoresEditor/>}/>
                            <Route path={ROUTES.structures} element={<StructuresEditor/>}/>
                            {/*<Route path={ROUTES.} element={<StructuresEditor/>}/>*/}
                            <Route path={ROUTES.notFound} element={<NotFound/>}/>
                            <Route path={"*"} element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </Suspense>
            </motion.div>
        </AnimatePresence>

    </>
}

export default App
