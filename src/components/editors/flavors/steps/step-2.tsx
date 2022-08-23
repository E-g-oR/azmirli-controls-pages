import {FC, useEffect, useMemo} from "react";
import {motion} from "framer-motion"
import useStoreStoresStorage from "../../../../storage/stores-storage";
import {Store, UUID} from "thin-backend";
import {flow, pipe} from "fp-ts/es6/function";
import * as A from "fp-ts/es6/ReadonlyArray"
import * as RNEA from "fp-ts/es6/ReadonlyNonEmptyArray"
import * as RR from "fp-ts/es6/ReadonlyRecord"
import useStoreCities from "../../../../storage/cities";
import List from "@mui/joy/List";
import {Checkbox, ListItem, Sheet} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import {Check} from "@mui/icons-material";
import Stack from "@mui/joy/Stack";
import {IDsList} from "../index";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useStoreCreateFlavor} from "../../../../storage/dialog/flavors-store";

const getStoreAddress = (store: Store) => `${store.streetType} ${store.streetName} ${store.building}`

// TODO move somewhere
export const defaultVolumes = ["30", "50", "100"]

export interface SimpleStore {
    storeId: UUID,
    address: string,
    volumes?: ReadonlyArray<string>
}

export type GroupedStores = RR.ReadonlyRecord<UUID, ReadonlyArray<SimpleStore>>
const getGroupedStores = (stores: ReadonlyArray<Store>): GroupedStores => pipe(
    stores,
    RNEA.groupBy(item => item.cityId),
    RR.map(A.map(store => ({
        storeId: store.id,
        address: getStoreAddress(store),
        volumes: defaultVolumes,
    }))),
)

const getAllStoresIDs = (grouped: GroupedStores): IDsList => pipe(
    grouped,
    // TODO move next line to common function "getGroupedStores"
    RR.toEntries,
    A.map(entry => entry[1]),
    A.map(
        flow(
            A.map((store: SimpleStore) => store.storeId)
        )
    ),
    A.flatten,
)

const getSelectedStores = (allStoresGrouped: GroupedStores, selectedStores: IDsList) => pipe(
    allStoresGrouped,
    RR.map(flow(
        A.filter(simpleStore => selectedStores.includes(simpleStore.storeId))
    )),
    RR.filter(stores => !!stores.length)
)

interface Props {
    selected: IDsList,
    onChange: (storeId: UUID) => void,
    setValues: (values: IDsList) => void,
}

const Step2: FC<Props> = ({selected, onChange, setValues}) => {
    const getCityById = useStoreCities(state => state.getCityById)
    const stores = useStoreStoresStorage(state => state.stores)
    const allGrouped = useMemo(() => stores ? getGroupedStores(stores) : {}, [stores])
    const allValues = useMemo(() => getAllStoresIDs(allGrouped), [allGrouped])

    const setSelectedStores = useStoreCreateFlavor(state => state.setSelectedStores)

    const selectedGrouped = useMemo(() => getSelectedStores(allGrouped, selected), [allGrouped, selected])

    useEffect(() => {
        setSelectedStores(selectedGrouped)
    }, [selectedGrouped])

    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
        <Stack
            direction={"column"}
            spacing={1}
            sx={{marginTop: 1}}
        >
            <Sheet>
                <Checkbox
                    label={"Выбрать все"}
                    checked={allValues.every(value => selected.includes(value))}
                    onChange={({target: {checked}}) => setValues(checked ? allValues : [])}
                />
            </Sheet>
            <Sheet
                variant={"outlined"}
                sx={{
                    borderRadius: "sm",
                    maxHeight: 300,
                    overflow: "auto",
                }}
            >
                <List>
                    {
                        pipe(
                            allGrouped,
                            RR.toEntries,
                            A.map(([cityId, simpleStores]) => <ListItem nested key={cityId}>
                                <ListItem
                                    component={"div"}
                                    sticky
                                    sx={{textAlign: "center"}}
                                >
                                    <Typography
                                        level={"body3"}
                                        textTransform={"uppercase"}
                                        fontWeight={"lg"}
                                        zIndex={5}
                                        textAlign={"center"}
                                    >{getCityById(cityId)?.name ?? "Неизвестный город"}</Typography>
                                </ListItem>
                                <Grid2
                                    container
                                    role={"group"}
                                    aria-labelledby={`Магазины ${getCityById(cityId)?.name ?? "неизвестного город"}а`}
                                    gap={1}
                                    display={"grid"}
                                    gridTemplateColumns={"repeat(2, 1fr)"}
                                >
                                    {
                                        simpleStores.map(({storeId, address}) => {
                                            const checked = selected.includes(storeId)
                                            return <Chip
                                                key={storeId}
                                                variant={checked ? "soft" : "outlined"}
                                                startDecorator={checked && <Check/>}
                                                sx={{zIndex: 0, width: "100%"}}
                                                color={checked ? 'primary' : 'neutral'}
                                            >
                                                <Checkbox
                                                    color={checked ? 'primary' : 'neutral'}
                                                    label={address}
                                                    variant={"outlined"}
                                                    disableIcon
                                                    overlay
                                                    checked={checked}
                                                    onChange={() => onChange(storeId)}
                                                />
                                            </Chip>
                                        })
                                    }
                                </Grid2>
                            </ListItem>)
                        )
                    }
                </List>
            </Sheet>
        </Stack>


    </motion.div>
}

export default Step2