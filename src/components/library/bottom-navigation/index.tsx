import {FC, useState} from "react";
import BottomNavigationMUI from "@mui/material/BottomNavigation"
import {BottomNavigationAction, Paper, Toolbar} from "@mui/material";
import {MenuItem} from "../navigation";
import {useLocation, useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import {bottomNavigationId} from "../../../stores/menu";
import {pipe} from "fp-ts/function";
import * as A from "fp-ts/ReadonlyArray"
import * as O from "fp-ts/Option"

const getActiveMenuItem = (location: string, menu: ReadonlyArray<MenuItem>): number => pipe(
    menu,
    A.findIndex(item => location.includes(item.link)),
    O.getOrElse(() => 0)
)


interface Props {
    menu: ReadonlyArray<MenuItem>,
}

const BottomNavigation: FC<Props> = ({menu}) => {
    const node = document.getElementById(bottomNavigationId)
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const [value, setValue] = useState(getActiveMenuItem(pathname, menu))


    return node && createPortal(<>
            <Toolbar/>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigationMUI
                    showLabels
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                >
                    {
                        menu.map(menuItem =>
                            <BottomNavigationAction
                                key={menuItem.name}
                                onClick={() => navigate(menuItem.link)}
                                label={menuItem.name}
                                icon={menuItem.icon}
                            />
                        )
                    }
                </BottomNavigationMUI>
            </Paper>
        </>
        , node)
}
export default BottomNavigation