import {FC} from "react";
import {IconButton, Stack, Typography} from "@mui/material";
import Table from "../../library/table";
import {useQuery} from "thin-backend-react";
import {City, query} from "thin-backend";
import {pipe} from "fp-ts/es6/function";

import * as A from "fp-ts/ReadonlyArray"
// import * as R from "fp-ts/Record"
// import * as O from "fp-ts/Option"
import {Delete, Edit} from "@mui/icons-material";

//
// const getHeaders = (cities: City[]): (keyof City)[] | null => pipe(
//     cities,
//     A.head,
//     O.fold(
//         () => null,
//         flow(R.keys)
//     )
// )

const getConfig = (a: ReadonlyArray<City>) => pipe(
    a,
    A.map(city => ({
        ...city,
        actions: <Stack spacing={1} direction={"row"}>
            <IconButton onClick={() => console.log("edit", city.subDomain)}>
                <Edit/>
            </IconButton>
            <IconButton onClick={() => console.log("delete", city.subDomain)}>
                <Delete/>
            </IconButton>
        </Stack>
    }))
)

const CitiesEditor: FC = () => {
    const cities = useQuery(query("cities").orderBy("subDomain"))

    const config = getConfig(cities ?? [])

    return <>
        <Typography variant={"h3"}>CitiesEditor</Typography>
        <Table config={config}/>
    </>
}

export default CitiesEditor