import {useContext, useMemo} from "react";
import {TableContext, tableContext} from "./index";
import clsx from "clsx";

import * as styles from "./table.css"

type Props<T, D = undefined> = {
    className?: string,
    cellClass?: string,
    row: T,
} & (D extends undefined ? {
    data?: undefined,
} : {
    data: D,
})

function TableRow<T>({className, cellClass, row}: Props<T>): JSX.Element {
    const {config, gap} = useContext(tableContext) as TableContext<T>

    const gridTemplateColumns = useMemo(() =>
            config.map(col => col.size).join(" ")
        , [config])

    return <tr
        className={className}
        style={{
            gridTemplateColumns,
            gridGap: gap
        }}>
        {config.map(config => <td key={config.key} className={clsx(styles.tableCell, cellClass) }>
            {config.render(row)}
        </td>)}
    </tr>
}

export default TableRow