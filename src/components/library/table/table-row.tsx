import {FC, ReactNode} from "react";

interface Props {
    children?: ReactNode
}

const TableRow: FC<Props> = ({children}) => children ? <tr>{children}</tr> : null

export default TableRow