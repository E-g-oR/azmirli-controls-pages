import {FC, useMemo} from "react";
import {
    IconButton,
    Skeleton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import Table, {Config} from "../../library/table";
import {City} from "thin-backend";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import TableHeader from "../../library/table/table-head";
import TableRow from "../../library/table/table-row";
import CitiesDialog from "./cities-dialog";
import useStoreDialogCity from "../../../stores/dialog/cities-store";
import FastActionButton from "../../library/fast-action-button";
import useStoreCities from "../../../stores/cities";


const CitiesEditor: FC = () => {
    const cities = useStoreCities(state=> state.cities)
    const setIsOpen = useStoreDialogCity(state => state.setIsOpen)
    const setCreateCity = useStoreDialogCity(state => state.setCreateCity)
    const setEditCity = useStoreDialogCity(state => state.setEditCity)


    const config: ReadonlyArray<Config<City>> = useMemo(()=> [
        {
        key: "actions",
        header: "Действия",
        size: "max-content",
        render: (v) => <Stack
            direction={"row"}
            spacing={1}
        >
            <Tooltip title={"Редактировать"}>
                <IconButton onClick={() => setEditCity(v)}>
                    <EditOutlined/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Удалить"}>
                <IconButton onClick={() => console.log("delete", v.name)}>
                    <DeleteOutlined/>
                </IconButton>
            </Tooltip>
        </Stack>
    }, {
        key: "name",
        header: "Имя",
        size: "max-content",
        render: (v) => <>{v.name}</>
    }, {
        key: "sub_domain",
        header: "Поддомен",
        size: "max-content",
        render: (v) => <>{v.subDomain}</>
    }, {
        key: "instagram",
        header: "Инстаграм",
        size: "300px",
        render: (v) => <>{v.instagram}</>
    }, {
        key: "vkontakte",
        header: "ВКонтакте",
        size: "300px",
        render: (v) => <>{v.vkontakte}</>
    }, {
        key: "facebook",
        header: "Фейсбук",
        size: "300px",
        render: (v) => <>{v.facebook}</>
    },], [setEditCity])

    return <>
        <Typography variant={"h3"} sx={{paddingBottom: 2}} >Редактор городов</Typography>
        {cities ?
            <Table config={config}>
                <TableHeader/>
                <tbody>
                {cities?.map(city => <TableRow key={city.id} row={city}/>)}
                </tbody>

            </Table>
            : <Skeleton variant={"rectangular"} width={"100%"} height={"100%"}/>
        }

        <FastActionButton onClick={setCreateCity}/>
        <CitiesDialog onClose={() => setIsOpen(false)}/>
    </>
}

export default CitiesEditor