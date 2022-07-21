import {FC} from "react";
import {
    Paper,
    Stack,
    // Typography
} from "@mui/material";
import * as styles from "./loading-screen.css"
import logo from "../../assets/img/logo_gold.png"

const LoadingScreen: FC = () => {
    return <Paper
        component={"div"}
        className={styles.screen}
    >
        <Stack direction={"column"} spacing={1} alignItems={"center"}>
            <img src={logo} alt={"logo"} width={280} height={220}/>
            {/*<Typography variant={"h2"} component={"h2"}>Welcome!</Typography>*/}
        </Stack>

    </Paper>
}

export default LoadingScreen