import {FC, useMemo} from "react";
import {IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {useQuery} from "thin-backend-react";
import {deleteRecord, Flavor, query, UUID} from "thin-backend";
import Table, {Config} from "../../library/table";
import TableHeader from "../../library/table/table-head";
import TableRow from "../../library/table/table-row";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import FastActionButton from "../../library/fast-action-button";
import useStoreFlavorsDialog from "../../../stores/dialog/flavors-store";
import FlavorsEditDialog, {getVolumesFromString} from "./dialog";
import {useSnackbar} from "notistack";
import {makeRequest} from "../cities/dialog";
import {pipe} from "fp-ts/es6/function";
import * as RR from "fp-ts/ReadonlyRecord"
import * as A from "fp-ts/ReadonlyArray"
import * as S from "fp-ts/string"

const deleteFlavor = (id: UUID) => deleteRecord("flavors", id)

const getVolumesUI = (input: string) => pipe(
    input,
    getVolumesFromString,
    RR.filter(volume => !!volume),
    RR.keys,
    A.intercalate(S.Monoid)(", ")
)

const FlavorsEditor: FC = () => {
    const {enqueueSnackbar} = useSnackbar()

    const onDeleteSuccess = () => {
        enqueueSnackbar("Аромат был успешно удален.", {variant: "success"})
    }
    const onDeleteError = () => {
        enqueueSnackbar("Не получилось удалить аромат ://", {variant: "error"})
    }

    const onClose = useStoreFlavorsDialog(state => state.setClose)
    const setCreateFlavor = useStoreFlavorsDialog(state => state.setCreateFlavor)
    const setEditFlavor = useStoreFlavorsDialog(state => state.setEditFlavor)


    const config: ReadonlyArray<Config<Flavor>> = useMemo(() => [{
        key: "actions",
        header: "Действия",
        size: "max-content",
        render: (v) => <Stack
            direction={"row"}
            spacing={1}
        >
            <Tooltip title={"Редактировать"}>
                <IconButton>
                    <EditOutlined onClick={() => setEditFlavor(v)}/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Удалить"}>
                <IconButton>
                    <DeleteOutlined
                        onClick={() => makeRequest(() => deleteFlavor(v.id), onDeleteSuccess, onDeleteError)}/>
                </IconButton>
            </Tooltip>
        </Stack>
    }, {
        key: "name",
        header: "Название",
        size: "max-content",
        render: (v) => <>{v.name}</>
    }, {
        key: "brand",
        header: "Бренд",
        size: "max-content",
        render: (v) => <>{v.brand}</>
    }, {
        key: "category",
        header: "Категория",
        size: "max-content",
        render: (v) => <>{v.category}</>
    }, {
        key: "volumes",
        header: "Объемы",
        size: "max-content",
        render: (v) => <>{getVolumesUI(v.volumes)}</>
    }, {
        key: "sex",
        header: "Пол",
        size: "max-content",
        render: (v) => <>{v.sex}</>
    }, {
        key: "articleNumber",
        header: "Артикул",
        size: "max-content",
        render: (v) => <>{v.articleNumber}</>
    },], [])


    const flavors = useQuery(query("flavors"))
    return <>
        <Typography variant={"h3"} sx={{paddingBottom: 2}}>Редактор ароматов</Typography>
        <Table config={config}>
            <TableHeader/>
            {flavors?.map(flavor => <TableRow key={flavor.id} row={flavor}/>)}
        </Table>

        <FastActionButton onClick={setCreateFlavor}/>
        <FlavorsEditDialog onClose={onClose}/>
    </>
}

export default FlavorsEditor