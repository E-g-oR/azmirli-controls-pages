import {FC} from "react";
import {Fab} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";


interface Props {
    onClick: () => void,
}

const FastActionButton: FC<Props> = ({onClick}) =>
    <Fab color={"primary"} sx={{position: "fixed", right: "2rem", bottom: "2rem"}} onClick={onClick}>
        <AddOutlined/>
    </Fab>


export default FastActionButton