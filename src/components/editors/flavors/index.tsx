import {FC, ReactNode, useEffect, useMemo} from "react";
import {Stack, Tooltip, Typography} from "@mui/material";
import {useQuery} from "thin-backend-react";
import {Flavor, query, UUID} from "thin-backend";
import Table, {Config} from "../../library/table";
import TableRow from "../../library/table/table-row";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import FastActionButton from "../../library/fast-action-button";
import useStoreFlavorsDialog from "../../../storage/dialog/flavors-store";
import FlavorsEditDialog from "./dialog";
// import {useSnackbar} from "notistack";
import useStoreCities from "../../../storage/cities";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../../utils/routing";
import IconButton from "@mui/joy/IconButton";
import {pipe} from "fp-ts/es6/function";
import Chip from "@mui/joy/Chip"
import Grid2 from "@mui/material/Unstable_Grid2";
import * as A from "fp-ts/es6/ReadonlyArray"
import * as RNEA from "fp-ts/es6/ReadonlyNonEmptyArray"
import * as RR from "fp-ts/es6/ReadonlyRecord"
import * as O from "fp-ts/es6/Option"
import useStoreStoresStorage from "../../../storage/stores-storage";

// const deleteFlavor = (id: UUID) => deleteRecord("flavors", id)


export type IDsList = ReadonlyArray<UUID>

const getCitiesIDs = (flavors: RNEA.ReadonlyNonEmptyArray<Flavor>): IDsList => pipe(
    flavors,
    A.map(({cityId}) => O.fromNullable(cityId)),
    A.compact,
)

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
    citiesIDs: IDsList,
    storesIDs: IDsList,
}

type GroupedFlavors = RR.ReadonlyRecord<string, GroupedFlavor>
const groupFlavors = (flavors: ReadonlyArray<Flavor>): GroupedFlavors => pipe(
    flavors,
    RNEA.groupBy(flavor => flavor.articleNumber),
    RR.map(flavors_ => {
        const {name, sex, category, brand, articleNumber} = RNEA.head(flavors_)
        const storesIDs = getStoresIDs(flavors_)
        const citiesIDs = getCitiesIDs(flavors_)
        const result: GroupedFlavor = {
            name,
            sex,
            category,
            brand,
            articleNumber,
            citiesIDs,
            storesIDs
        }
        return result
    })
)

const FlavorsEditor: FC = () => {
    // const {enqueueSnackbar} = useSnackbar()

    const flavors = useQuery(query("flavors"))

    const grouped = useMemo(() => pipe(
        flavors ?? [],
        groupFlavors
    ), [flavors])


    const setStores = useStoreStoresStorage(state => state.setStores)
    const stores = useQuery(query("stores"))

    useEffect(() => {
        setStores(stores)
    }, [stores])

    // const onDeleteSuccess = () => {
    //     enqueueSnackbar("Аромат был успешно удален.", {variant: "success"})
    // }
    // const onDeleteError = () => {
    //     enqueueSnackbar("Не получилось удалить аромат ://", {variant: "error"})
    // }

    const setIsOpen = useStoreFlavorsDialog(state => state.setIsOpen)
    const setCreateFlavor = useStoreFlavorsDialog(state => state.setCreateFlavor)
    // const setEditFlavor = useStoreFlavorsDialog(state => state.setEditFlavor)
    const cities = useStoreCities(state => state.cities)
    const getCityById = useStoreCities(state => state.getCityById)

    const onClose = () => {
        setCreateFlavor()
        setIsOpen(false)
    }

    const config: ReadonlyArray<Config<GroupedFlavor>> = useMemo(() => [{
        key: "actions",
        header: "Действия",
        size: "max-content",
        render: () => <Stack
            direction={"row"}
            spacing={1}
        >
            <Tooltip title={"Редактировать"}>
                <IconButton
                    // onClick={() => setEditFlavor(v)}
                    variant={"plain"}
                >
                    <EditOutlined/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Удалить"}>
                <IconButton
                    // onClick={() => makeRequest(() => deleteFlavor(v.id), onDeleteSuccess, onDeleteError)}
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
        render: (v) => <span>{v.sex}</span>
    }, {
        key: "cityName",
        header: "Города",
        size: "max-content",
        render: ({citiesIDs}) => <Grid2 container spacing={1}>
            {
                citiesIDs.map(cityId => <Grid2 key={cityId} xs={"auto"}>
                    <Chip variant={"soft"}> {getCityById(cityId)?.name} </Chip>
                </Grid2>)
            }
        </Grid2>
    },], [cities, getCityById])

    const goAway = false

    // TODO move function out of the component
    const tableData: ReadonlyArray<ReactNode> = useMemo(() => pipe(
        grouped,
        RR.map(flavor => <TableRow key={flavor.articleNumber} row={flavor}/>),
        RR.toReadonlyArray,
        A.map(RNEA.tail),
    ), [grouped])

    return goAway ? <Navigate to={ROUTES.notFound}/>
        : <>
            <Typography variant={"h3"} sx={{paddingBottom: 2}}>Редактор ароматов</Typography>
            <Table config={config}>
                {tableData}
            </Table>
            <FastActionButton onClick={setCreateFlavor}/>
            <FlavorsEditDialog onClose={onClose}/>
        </>
}

export default FlavorsEditor