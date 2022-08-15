import {FC, useMemo} from "react";
import {IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {useQuery} from "thin-backend-react";
import {deleteRecord, Flavor, query, UUID} from "thin-backend";
import Table, {Config} from "../../library/table";
import TableRow from "../../library/table/table-row";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import FastActionButton from "../../library/fast-action-button";
import useStoreFlavorsDialog from "../../../stores/dialog/flavors-store";
import FlavorsEditDialog, {processStringToArray} from "./dialog";
import {useSnackbar} from "notistack";
import {makeRequest} from "../cities/cities-dialog";
import useStoreCities from "../../../stores/cities";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../../utils/routing";

const deleteFlavor = (id: UUID) => deleteRecord("flavors", id)

const FlavorsEditor: FC = () => {
    const {enqueueSnackbar} = useSnackbar()

    const flavors = useQuery(query("flavors"))

    const onDeleteSuccess = () => {
        enqueueSnackbar("Аромат был успешно удален.", {variant: "success"})
    }
    const onDeleteError = () => {
        enqueueSnackbar("Не получилось удалить аромат ://", {variant: "error"})
    }

    const setIsOpen = useStoreFlavorsDialog(state => state.setIsOpen)
    const setCreateFlavor = useStoreFlavorsDialog(state => state.setCreateFlavor)
    const setEditFlavor = useStoreFlavorsDialog(state => state.setEditFlavor)
    const cities = useStoreCities(state => state.cities)
    const getCityById = useStoreCities(state => state.getCityById)

    const onClose = () => {
        setCreateFlavor()
        setIsOpen(false)
    }


    const config: ReadonlyArray<Config<Flavor>> = useMemo(() => [{
        key: "actions",
        header: "Действия",
        size: "max-content",
        render: (v) => <Stack
            direction={"row"}
            spacing={1}
        >
            <Tooltip title={"Редактировать"}>
                <IconButton onClick={() => {
                    setEditFlavor(v)
                }}>
                    <EditOutlined/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Удалить"}>
                <IconButton onClick={() => makeRequest(() => deleteFlavor(v.id), onDeleteSuccess, onDeleteError)}>
                    <DeleteOutlined/>
                </IconButton>
            </Tooltip>
        </Stack>
    }, {
        key: "cityName",
        header: "Город",
        size: "max-content",
        render: (v) => <span>{getCityById(v?.cityId ?? "")?.name}</span>
    }, {
        key: "sex",
        header: "Пол",
        size: "max-content",
        render: (v) => <span>{v.sex}</span>
    }, {
        key: "brand",
        header: "Бренд",
        size: "max-content",
        render: (v) => <>{v.brand}</>
    }, {
        key: "name",
        header: "Название",
        size: "max-content",
        render: (v) => <>{v.name}</>
    }, {
        key: "category",
        header: "Категория",
        size: "max-content",
        render: (v) => <>{v.category}</>
    }, {
        key: "volumes",
        header: "Объемы",
        size: "max-content",
        render: (v) => <span>{processStringToArray(v.volume ?? "").toString()}</span>
    }, {
        key: "articleNumber",
        header: "Артикул",
        size: "max-content",
        render: (v) => <span>{v.articleNumber}</span>
    },], [cities, getCityById])

    const goAway = true

    return goAway ? <Navigate to={ROUTES.notFound}/>
        : <>
            <Typography variant={"h3"} sx={{paddingBottom: 2}}>Редактор ароматов</Typography>
            <Table config={config}>
                {flavors?.map(flavor => <TableRow key={flavor.id} row={flavor}/>)}
            </Table>

            <FastActionButton onClick={setCreateFlavor}/>
            <FlavorsEditDialog onClose={onClose}/>
        </>
}

export default FlavorsEditor