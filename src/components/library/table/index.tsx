import * as styles from "./table.css"

import {createContext, ReactNode, useMemo} from "react";
import {CSSVarFunction} from "@vanilla-extract/private"
import {Paper} from "@mui/material";

export type PixelSize = `${number}px`
type ColumnSize = PixelSize | `${number}fr` | CSSVarFunction | "max-content"

export interface Config<T> {
    key: string | number,
    header: string,
    render: (row: T) => ReactNode,
    size: ColumnSize,
}

export interface TableContext<T = unknown> {
    gap: number,
    config: ReadonlyArray<Config<T>>,
}

export const tableContext = createContext<TableContext>({
    gap: 0,
    config: [],
})

interface Props<T> {
    config: ReadonlyArray<Config<T>>,
    gap?: number,
    children: ReactNode[],
}

function Table<T>(props: Props<T>): JSX.Element {
    const context: TableContext = useMemo(() => ({
        gap: props.gap ?? 0,
        config: props.config as ReadonlyArray<Config<unknown>>
    }), [props.gap, props.config])

    return <tableContext.Provider value={context}>
        <Paper variant={"outlined"}>
            <table className={styles.table}>
                {props.children}
            </table>
        </Paper>

    </tableContext.Provider>
}

export default Table