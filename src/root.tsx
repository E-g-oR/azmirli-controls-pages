import {FC, lazy} from "react";
import {useLocation} from "react-router-dom";
import {parseLocation} from "./utils/routing";
import {match} from "ts-pattern";


const CitiesEditor = lazy(() => import("./components/editors/cities"))
const FlavorsEditor = lazy(() => import("./components/editors/flavors"))
const NotFound = lazy(() => import("./components/library/not-found"))
const AddressesEditor = lazy(() => import("./components/editors/addresses"))
const StructuresEditor = lazy(() => import("./components/editors/structures"))


const Root: FC = () => {
    const location = useLocation()
    const {_tag} = parseLocation(location.pathname)

    return match(_tag)
        .with("Cities", () => <CitiesEditor/>)
        .with("Flavors", () => <FlavorsEditor/>)
        .with("Addresses", () => <AddressesEditor/>)
        .with("Structures", () => <StructuresEditor/>)
        .with("NotFound", () => <NotFound/>)
        .otherwise(() => <NotFound/>)

}

export default Root