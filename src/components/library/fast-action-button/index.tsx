import {FC} from "react";
// import {useLocation} from "react-router-dom";
// import {parseLocation} from "../../../utils/routing";
import {Fab} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";

const FastActionButton: FC = () => {
    // const location = useLocation()
    // const parsed = parseLocation(location.pathname)
    return <Fab color={"primary"} sx={{position: "fixed", right: "2rem", bottom: "2rem"}}>
        <AddOutlined/>
    </Fab>
}

export default FastActionButton