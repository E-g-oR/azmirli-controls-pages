import {FC, useContext, useMemo} from "react";
import {tableContext} from "./index";

import * as styles from "./table.css"
import clsx from "clsx";
import {useTheme} from "@mui/material";

interface Props {
    className?: string,
    cellClass?: string,
}

const TableHeader: FC<Props> = ({className, cellClass}) => {
    const {config, gap} = useContext(tableContext)
    const theme = useTheme()

    const gridTemplateColumns = useMemo(() =>
            config.map(col => col.size).join(" ")
        , [config])

    return <thead>
    <tr
        className={clsx(styles.tr, className)}
        style={{
            gridTemplateColumns,
            gridGap: gap,
            backgroundColor: theme.palette.primary.light
        }}
    >
        {config.map(column => <th key={column.key} className={clsx(styles.th, cellClass)}>{column.header}</th>)}
    </tr>
    </thead>
}

export default TableHeader
