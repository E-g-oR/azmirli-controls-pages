import {FC, useCallback, useMemo} from "react";
import {Box, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import Table, {Config} from "../../library/table";
import {deleteRecord, query, Store, UUID} from "thin-backend";
import useStoreCities from "../../../stores/cities";
import TableHeader from "../../library/table/table-head";
import {useQuery} from "thin-backend-react";
import TableRow from "../../library/table/table-row";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import FastActionButton from "../../library/fast-action-button";
import useStoreStores from "../../../stores/dialog/stores-store";
import StoresDialog from "./stores-dialog";
// import {makeRequest} from "../cities/dialog";
import {useSnackbar} from "notistack";
import {makeRequest} from "../cities/cities-dialog";

const deleteStore = (id: UUID) => () => deleteRecord("stores", id)

const StoresTable: FC = () => {
    const setMode = useStoreStores(state => state.setMode)
    const setIsOpen = useStoreStores(state => state.setIsOpen)
    const getCityById = useStoreCities(state => state.getCityById)
    const setCurrentStore = useStoreStores(state => state.setCurrentStore)
    const {enqueueSnackbar} = useSnackbar()

    const setEditStore = useCallback((store: Store) => {
        setMode("edit")
        setCurrentStore(store)
        setIsOpen(true)
    }, [setMode, setCurrentStore])

    const stores = useQuery(query("stores"))

    const onDeleteSuccess = () => {
        enqueueSnackbar("Аромат был успешно удален.", {variant: "success"})
    }
    const onDeleteError = () => {
        enqueueSnackbar("Не получилось удалить аромат ://", {variant: "error"})
    }

    const config: ReadonlyArray<Config<Store>> = useMemo(() => [
        {
            key: "actions",
            header: "Действия",
            size: "max-content",
            render: (v) => <Stack
                direction={"row"}
                spacing={1}
            >
                <Tooltip title={"Редактировать"}>
                    <IconButton onClick={() => setEditStore(v)}>
                        <EditOutlined/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Удалить"}>
                    <IconButton
                        onClick={() => makeRequest(deleteStore(v.id), onDeleteSuccess, onDeleteError)}
                    >
                        <DeleteOutlined/>
                    </IconButton>
                </Tooltip>
            </Stack>
        },
        {
            key: "city",
            header: "Город",
            size: "max-content",
            render: (v) => <Box>{getCityById(v.cityId ?? "")?.name}</Box>
        }, {
            key: "address",
            header: "Адрес",
            size: "max-content",
            render: (v) => <Box>ул. {v.streetName}, д. {v.building}</Box>
        }, {
            key: "workingTime",
            header: "время работы",
            size: "max-content",
            render: (v) => <Box>{v.workingTimeStart}:{v.workingTimeEnd}</Box>
        }, {
            key: "comment",
            header: "Коментарий",
            size: "max-content",
            render: (v) => <Box>{v.comment}</Box>
        },
    ], [getCityById, setEditStore])

    return <Box>
        <Typography variant={"h3"} component={"h1"}>Редактор магазинов</Typography>
        <Table config={config}>
            <TableHeader/>
            <tbody>
            {stores?.map(store => <TableRow key={store.id} row={store}/>)}
            </tbody>
        </Table>
        <StoresDialog/>
        <FastActionButton onClick={() => {
            setMode("create")
            setIsOpen(true)
        }}
        />
    </Box>
}

export default StoresTable