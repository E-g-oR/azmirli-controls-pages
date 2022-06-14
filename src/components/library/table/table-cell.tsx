import {FC, ReactNode} from "react";

interface Props {
    children?: ReactNode
}

const TableCell: FC<Props> = ({children}) => <td style={{padding: "0.12rem  0.5rem"}}>{children ?? "empty"}</td>

export default TableCell