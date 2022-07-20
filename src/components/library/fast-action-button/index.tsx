import {FC} from "react";
import {Fab, useTheme} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import useStoreMenu from "../../../stores/menu";


interface Props {
    onClick: () => void,
}

const FastActionButton: FC<Props> = ({onClick}) => {
    const theme = useTheme()
    const navigationType = useStoreMenu(state => state.type)
    return <Fab
        color={"primary"}
        sx={{
            position: "fixed",
            right: navigationType === "side-menu" ? theme.spacing(3) : theme.spacing(1.5),
            bottom: navigationType === "side-menu" ? theme.spacing(3) : theme.spacing(9),
        }}
        onClick={onClick}
    >
        <AddOutlined/>
    </Fab>
}


export default FastActionButton