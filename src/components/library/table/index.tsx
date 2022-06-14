import {ReactNode} from "react";
import {Paper, Typography} from "@mui/material";

import * as styles from "./table.css"
import {pipe} from "fp-ts/function";

import * as A from "fp-ts/ReadonlyArray"
import * as R from "fp-ts/Record"
import * as O from "fp-ts/Option"

interface Props<T> {
    children?: ReactNode,
    config?: ReadonlyArray<T>,
}

function getKeys<T extends Record<string, ReactNode>>(a: ReadonlyArray<T>) {
    return pipe(
        a,
        A.head,
        O.fold(
            () => null,
            (a: T) => R.keys(a)
        )
    )
}

function Table<T extends Record<string, ReactNode>>(props: Props<T>) {
    const {config} = props

    const head = getKeys(config ?? [])

    return <div>
        <Typography variant={"h4"}>Table</Typography>
        <Paper
            variant={"outlined"}
            sx={{overflow: "auto"}}
        >
            <table className={styles.table}>
                <>
                    {
                        head && <>
                            <thead className={styles.tableHead}>
                            {head?.map(name => <th key={name} style={{padding: "0.5rem"}}>{name}</th>)}
                            </thead>
                        </>
                    }
                    <tbody>
                    {
                        config?.map((item, index) => {
                            const keys = R.keys(item)
                            return <tr key={index}>
                                {keys.map((key) =>
                                    <td key={key} style={{}}>
                                        <>{item[key]}</>
                                    </td>)
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </>

            </table>
        </Paper>
    </div>
}

export default Table