import {FC} from "react";
import {IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {useQuery} from "thin-backend-react";
import {Flavor, query} from "thin-backend";
import Table, {Config} from "../../library/table";
import TableHeader from "../../library/table/table-head";
import TableRow from "../../library/table/table-row";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";

const config: ReadonlyArray<Config<Flavor>> = [{
    key: "actions",
    header: "Действия",
    size: "max-content",
    render: (v) => <Stack
        direction={"row"}
        spacing={1}
    >
        <Tooltip title={"Редактировать"}>
            <IconButton>
                <EditOutlined onClick={() => console.log("edit", v.name)}/>
            </IconButton>
        </Tooltip>
        <Tooltip title={"Удалить"}>
            <IconButton>
                <DeleteOutlined onClick={() => console.log("delete", v.name)}/>
            </IconButton>
        </Tooltip>
    </Stack>
},{
    key: "name",
    header: "Название",
    size: "max-content",
    render: (v) => <>{v.name}</>
},{
    key: "brand",
    header: "Бренд",
    size: "max-content",
    render: (v) => <>{v.brand}</>
},{
    key: "volumes",
    header: "Объемы",
    size: "max-content",
    render: (v) => <>{v.volumes}</>
},{
    key: "sex",
    header: "Пол",
    size: "max-content",
    render: (v) => <>{v.sex}</>
},{
    key: "articleNumber",
    header: "Артикул",
    size: "max-content",
    render: (v) => <>{v.articleNumber}</>
},]

const FlavorsEditor: FC = () => {
    const flavors = useQuery(query("flavors"))
    return <>
        <Typography variant={"h3"}>FlavorsEditor</Typography>
        <Table config={config}>
            <TableHeader/>
            {flavors?.map(flavor => <TableRow key={flavor.id} row={flavor}/>)}
        </Table>
    </>
}

export default FlavorsEditor