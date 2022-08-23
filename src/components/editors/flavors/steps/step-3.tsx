import {FC, useState} from "react";
import Typography from "@mui/joy/Typography";
import {useStoreCreateFlavor} from "../../../../storage/dialog/flavors-store";
import useStoreCities from "../../../../storage/cities";
import {motion} from "framer-motion";
import List from "@mui/joy/List";
import {pipe} from "fp-ts/es6/function";
import * as RR from "fp-ts/es6/ReadonlyRecord"
import * as A from "fp-ts/es6/ReadonlyArray"
import Grid2 from "@mui/material/Unstable_Grid2";
import Sheet from "@mui/joy/Sheet";
import ListItem from "@mui/joy/ListItem";
import {defaultVolumes} from "./step-2";
import Box from "@mui/joy/Box";
import Checkboxes from "../../../library/input/checkbox";

const Step3: FC = () => {
    const selectedStores = useStoreCreateFlavor(state => state.selectedStores)
    const getCityById = useStoreCities(state => state.getCityById)

    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
        <Sheet
            variant={"outlined"}
            sx={{
                marginTop: 1,
                borderRadius: "sm",
                maxHeight: 300,
                overflow: "auto",
            }}
        >
            <List>
                { // TODO move this logic out and make multyproposal component
                    pipe(
                        selectedStores,
                        RR.toEntries,
                        A.map(([cityId, simpleStores]) => <ListItem nested key={cityId}>
                            <ListItem sticky>
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
                                    simpleStores.map(({storeId, address, volumes}) => {
                                        const [values, setValues] = useState(volumes ?? defaultVolumes)

                                        // TODO записывать любые изменения в стор

                                        const onChange = (value: string) => setValues(volumes =>
                                            volumes.includes(value) ?
                                                pipe(
                                                    volumes,
                                                    A.filter(item => item !== value)
                                                )
                                                : pipe(
                                                    volumes,
                                                    A.append(value)
                                                )
                                        )

                                        return <Box
                                            key={storeId}
                                        >
                                            <Typography
                                                level={"body2"}
                                                key={storeId}
                                                sx={{zIndex: 0, width: "100%"}}
                                            >{address}</Typography>
                                            <Checkboxes
                                                options={defaultVolumes}
                                                values={values}
                                                onChange={onChange}
                                            />
                                        </Box>
                                    })
                                }
                            </Grid2>
                        </ListItem>)
                    )
                }
            </List>

        </Sheet>
    </motion.div>
}

export default Step3