import {FC} from "react";
import {useLocation} from "react-router-dom";
import {parseLocation} from "./utils/routing";
import {match} from "ts-pattern";
import CitiesEditor from "./components/editors/cities";
import FlavorsEditor from "./components/editors/flavors";
import NotFound from "./components/library/not-found";
import AddressesEditor from "./components/editors/addresses";

const Root: FC = () => {
    const location = useLocation()
    const {_tag} = parseLocation(location.pathname)

    return match(_tag)
        .with("Cities", () => <CitiesEditor/>)
        .with("Flavors", () => <FlavorsEditor/>)
        .with("Addresses", () => <AddressesEditor/>)
        .with("Structures", () => null)
        .with("NotFound", () => <NotFound/>)
        .otherwise(() => <NotFound/>)

}

export default Root