import {FC, ReactNode, useEffect} from "react";
import {useCurrentUser} from "thin-backend-react";
import {logout} from "thin-backend";

interface Props {
    children: ReactNode,
}

const ProtectedComponent: FC<Props> = ({children}) => {
    const user = useCurrentUser()

    useEffect(() => {
        if (user?.userType !== "manager") {
            logout()
        }
    }, [user])

    return user?.userType === "manager" ? <>{children}</> : null
}

export default ProtectedComponent