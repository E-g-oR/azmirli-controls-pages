import {FC, ReactNode, useCallback, useEffect, useMemo} from "react";
import {Stack, Tooltip, Typography} from "@mui/material";
import {useQuery} from "thin-backend-react";
import { deleteRecords, Flavor, query, Store, UUID} from "thin-backend";
import Table, {Config} from "../../library/table";
import TableRow from "../../library/table/table-row";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import FastActionButton from "../../library/fast-action-button";
import useStoreFlavorsDialog, {useStoreCreateFlavor} from "../../../storage/dialog/flavors-store";
import FlavorsEditDialog, {processStringToArray, Sex, sexTranslate} from "./dialog";
import useStoreCities from "../../../storage/cities";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../../utils/routing";
import IconButton from "@mui/joy/IconButton";
import {flow, pipe} from "fp-ts/es6/function";
import Chip from "@mui/joy/Chip"
import Grid2 from "@mui/material/Unstable_Grid2";
import * as A from "fp-ts/es6/ReadonlyArray"
import * as RNEA from "fp-ts/es6/ReadonlyNonEmptyArray"
import * as RR from "fp-ts/es6/ReadonlyRecord"
import * as O from "fp-ts/es6/Option"
import useStoreStoresStorage from "../../../storage/stores-storage";
import {getStoreAddress, GroupedStores} from "./steps/step-2";
import {useSnackbar} from "notistack";

type DeleteFlavors = (
    articleNumber: string,
    onSuccess: () => void,
    onError: (err?: string) => void,
) => Promise<void>
const deleteFlavors: DeleteFlavors = async (articleNumber, onSuccess, onError) => {
    const flavorsIDs = await query("flavors")
        .where("articleNumber", articleNumber)
        .select("id")
        .fetch()

    deleteRecords(
        "flavors",
        pipe(
            flavorsIDs,
            A.map(({id}) => id)
        ) as string[]
    )
        .then(() => onSuccess())
        .catch(onError)
}

export type IDsList = ReadonlyArray<UUID>

const getStoresIDs = (flavors: RNEA.ReadonlyNonEmptyArray<Flavor>): IDsList => pipe(
    flavors,
    A.map(({storeId}) => O.fromNullable(storeId)),
    A.compact,
)


export interface GroupedFlavor {
    name: string,
    brand: string,
    category: string,
    sex: string,
    articleNumber: string,
    stores: GroupedStores,
}

type GetStoreF = (id: UUID) => Store | undefined
type GroupedFlavors = RR.ReadonlyRecord<string, GroupedFlavor>
const groupFlavors = (flavors: ReadonlyArray<Flavor>, getStore: GetStoreF): GroupedFlavors => pipe(
    flavors,
    RNEA.groupBy(flavor => flavor.articleNumber),
    RR.map(flavors_ => {
        const {name, sex, category, brand, articleNumber, volume} = RNEA.head(flavors_)
        const storesIDs = getStoresIDs(flavors_)
        const stores: GroupedStores = pipe(
            storesIDs,
            A.map(flow(
                getStore,
                O.fromNullable,
            )),
            A.compact,

            // TODO make separate multiporpousal function 👇
            RNEA.groupBy(store => store.cityId),
            RR.map(storesList => pipe(
                storesList,
                A.map((store) => ({
                    storeId: store.id,
                    address: getStoreAddress(store),
                    volumes: processStringToArray(volume)
                }))
            ))
        )
        const result: GroupedFlavor = {
            name,
            sex,
            category,
            brand,
            articleNumber,
            stores,
        }
        return result
    })
)

const getTableData = (grouped: RR.ReadonlyRecord<string, GroupedFlavor>): ReadonlyArray<ReactNode> => pipe(
    grouped,
    RR.map(flavor => <TableRow key={flavor.articleNumber} row={flavor}/>),
    RR.toReadonlyArray,
    A.map(RNEA.tail),
)

const FlavorsEditor: FC = () => {
    const {enqueueSnackbar} = useSnackbar()

    const flavors = useQuery(query("flavors"))
    const stores = useQuery(query("stores"))

    useEffect(() => {
        setStores(stores ?? [])
    }, [stores])

    const getStoreById = useStoreStoresStorage(state => state.getStoreById)

    const setSelectedStores = useStoreCreateFlavor(state => state.setSelectedStores)

    const grouped = useMemo(() => flavors && groupFlavors(flavors, getStoreById), [flavors, stores, getStoreById])

    const setStores = useStoreStoresStorage(state => state.setStores)


    const setBaseData = useStoreCreateFlavor(state => state.setData)
    const setMode = useStoreFlavorsDialog(state => state.setMode)
    const setIsOpen = useStoreFlavorsDialog(state => state.setIsOpen)

    const onDeleteSuccess = () => {
        enqueueSnackbar("Аромат был успешно удален.", {variant: "success"})
    }
    const onDeleteError = (error?: string) => {
        enqueueSnackbar("Не получилось удалить аромат ://", {variant: "error"})
        error && enqueueSnackbar(error, {variant: "error"})

    }

    const setCreateFlavor = useStoreFlavorsDialog(state => state.setCreateFlavor)
    // const setEditFlavor = useStoreFlavorsDialog(state => state.setEditFlavor)
    const cities = useStoreCities(state => state.cities)
    const getCityById = useStoreCities(state => state.getCityById)

    const onClose = () => {
        setCreateFlavor()
        setIsOpen(false)
    }

    const onEditClick = useCallback((groupedFlavor: GroupedFlavor) => {
        const {name, sex, category, brand, articleNumber} = groupedFlavor
        setBaseData({name, sex, category, brand, articleNumber})
        setSelectedStores(groupedFlavor.stores)
        setMode("edit")
        setIsOpen(true)
    }, [setBaseData, setMode, setIsOpen])

    const config: ReadonlyArray<Config<GroupedFlavor>> = useMemo(() => [{
        key: "actions",
        header: "Действия",
        size: "max-content",
        render: (v) => <Stack
            direction={"row"}
            spacing={1}
        >
            <Tooltip title={"Редактировать"}>
                <IconButton
                    onClick={() => onEditClick(v)}
                    variant={"plain"}
                >
                    <EditOutlined/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Удалить"}>
                <IconButton
                    onClick={() => deleteFlavors(v.articleNumber, onDeleteSuccess, onDeleteError)}
                    variant={"plain"}
                >
                    <DeleteOutlined/>
                </IconButton>
            </Tooltip>
        </Stack>
    }, {
        key: "articleNumber",
        header: "Артикул",
        size: "max-content",
        render: (v: GroupedFlavor) => <span>{v.articleNumber}</span>
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
        key: "sex",
        header: "Пол",
        size: "max-content",
        render: (v) => <span>{sexTranslate[v.sex as Sex]}</span>
    },
        {
            key: "cityName",
            header: "Города",
            size: "max-content",
            render: ({stores}) => <Grid2 container spacing={1}>
                {
                    pipe(
                        stores,
                        RR.keys,
                        A.map(cityId => <Grid2 key={cityId} xs={"auto"}>
                            <Chip variant={"soft"}> {getCityById(cityId)?.name ?? "Неизвестный город"} </Chip>
                        </Grid2>)
                    )
                }
            </Grid2>
        },
    ], [cities, getCityById, onEditClick])

    const goAway = false

    // const tableData = useMemo(() => getTableData(grouped), [grouped])

    return goAway ? <Navigate to={ROUTES.notFound}/>
        : <>
            <Typography variant={"h3"} sx={{paddingBottom: 2}}>Редактор ароматов</Typography>
            <Table config={config}>
                {getTableData(grouped ?? {})}
            </Table>

            {/* TODO обнулять стейт для создания нового аромата */}
            <FastActionButton onClick={setCreateFlavor}/>

            <FlavorsEditDialog onClose={onClose}/>
        </>
}

export default FlavorsEditor