import {FC, useContext, useMemo} from "react";
import {tableContext} from "./index";

import * as styles from "./table.css"
import clsx from "clsx";

interface Props {
    className?: string,
    cellClass?: string,
}

const TableHeader: FC<Props> = ({className, cellClass}) => {
    const {config, gap} = useContext(tableContext)

    const gridTemplateColumns = useMemo(() =>
            config.map(col => col.size).join(" ")
        , [config])

    return <thead>
    <tr
        className={clsx(styles.tableHead, className)}
        style={{
            gridTemplateColumns,
            gridGap: gap
        }}
    >
        {config.map(column => <th key={column.key} className={clsx(styles.tableCell, cellClass)}>{column.header}</th>)}
    </tr>
    </thead>
}

export default TableHeader
