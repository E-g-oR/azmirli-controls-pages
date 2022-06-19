import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import DialogLayout from "../../dialog";
import useStoreFlavorsDialog from "../../../stores/dialog/flavors-store";
import {City, createRecord, Flavor, NewFlavor, query, updateRecord} from "thin-backend";
import {
    Checkbox, FormControl,
    FormControlLabel,
    FormGroup, FormLabel, InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import * as RR from "fp-ts/ReadonlyRecord"
import {pipe} from "fp-ts/es6/function";
import * as Json from "fp-ts/Json"
import * as E from "fp-ts/Either"
import {useQuery} from "thin-backend-react";
import {useSnackbar} from "notistack";
import {makeRequest} from "../cities/dialog";

const createFlavor = (newFlavor: NewFlavor) => createRecord("flavors", newFlavor)
const editFlavor = (flavor: Flavor) => updateRecord("flavors", flavor.id, flavor)


interface Props {
    onClose: () => void,
}

type Sex = "men" | "women" | "unisex"
type SexRussian = "мужской" | "женский" | "унисекс"
const sexValues: ReadonlyArray<Sex> = ["women", "men", "unisex"] as const
const sexTranslate: Record<Sex, SexRussian> = {
    women: "женский",
    men: "мужской",
    unisex: "унисекс",
}

type Category = "lux" | "selective" | "exclusive"
const categoryValues: ReadonlyArray<Category> = ["lux", "exclusive", "selective"] as const

type Volume = "30" | "50" | "100"
type Volumes = RR.ReadonlyRecord<Volume, boolean>
const defaultVolumes: Volumes = {
    30: false,
    50: false,
    100: false,
}
export const getVolumesFromString = (input: string): Volumes => pipe(
    input,
    Json.parse,
    E.foldW(
        () => defaultVolumes,
        // (a) => a as Volumes
        (a) => Array.isArray(a) ? defaultVolumes : a as Volumes
    )
)

const transformVolumesToString = (volumes: Volumes) => pipe(
    volumes,
    Json.stringify,
    E.foldW(
        () => '{"30": false, "50": false, "100": false}',
        v => v
    )
)
const FlavorsEditDialog: FC<Props> = ({onClose}) => {
    const {enqueueSnackbar} = useSnackbar()

    const onSuccess = () => {
        enqueueSnackbar("Success", {variant: "success"})
        onClose()
    }

    const onError = () => {
        enqueueSnackbar("Something went wrong", {variant: "error"})
    }

    const isOpen = useStoreFlavorsDialog(state => state.isOpen)
    const mode = useStoreFlavorsDialog(state => state.mode)
    const currentFlavor = useStoreFlavorsDialog(state => state.flavor)


    // console.log(currentFlavor)

    const cities: ReadonlyArray<City> | null = useQuery(query("cities"))

    const [name, setName] = useState(currentFlavor?.name ?? "") // TextField
    const [brand, setBrand] = useState(currentFlavor?.brand ?? "") // TextField
    const [articleNumber, setArticleNumber] = useState(currentFlavor?.articleNumber ?? "") // TextField

    const [sex, setSex] = useState<Sex>(currentFlavor?.sex as Sex ?? sexValues[2]) // Select
    const [cityId, setCityId] = useState("") // Select
    const [category, setCategory] = useState<Category>(currentFlavor?.category as Category ?? categoryValues?.[0]) // Select

    const [volumes, setVolumes] = useState(getVolumesFromString(currentFlavor?.volumes ?? "")) // Checkbox

    const {30: small, 50: medium, 100: big} = volumes

    const title = (mode === "create" ? "Создать" : "Изменить") + " аромат " + (currentFlavor?.articleNumber ?? "")


    const newFlavor: NewFlavor = {
        name,
        brand,
        articleNumber,
        sex,
        cityId,
        category,
        volumes: transformVolumesToString(volumes)
    }

    console.log(transformVolumesToString(volumes))

    const onSubmit = useCallback(() => mode === "create" ? createFlavor(newFlavor) : (currentFlavor && editFlavor({...currentFlavor, ...newFlavor})), [mode, currentFlavor, newFlavor])


    useEffect(() => {
        setName(currentFlavor?.name ?? "")
        setBrand(currentFlavor?.brand ?? "")
        setArticleNumber(currentFlavor?.articleNumber ?? "")
        setSex(currentFlavor?.sex as Sex ?? sexValues[2])
        setCategory(currentFlavor?.category as Category ?? categoryValues[0])
        setVolumes(getVolumesFromString(currentFlavor?.volumes ?? ""))
        setCityId(currentFlavor?.cityId ?? "")
    }, [currentFlavor])

    const handleCheckboxChange = (v: ChangeEvent<HTMLInputElement>) => {
        console.log("name", v.target.name)
        setVolumes(prev => {
            console.log("prev", prev)

            return {
                ...prev,
                [v.target.name]:
                v.target.checked
            }
        })
    }

    return <DialogLayout
        isOpen={isOpen}
        onClose={onClose}
        onCancel={onClose}
        onSubmit={() => {
            makeRequest(onSubmit, onSuccess, onError)
        }}
        title={title}
    >
        <Stack direction={'column'} spacing={2}>

            <TextField
                variant={"standard"}
                title={"Название"}
                label={"Название"}
                name={"flavorName"}
                value={name}
                onChange={(v) => setName(v.target.value)}
            />
            <TextField
                variant={"standard"}
                title={"Бренд"}
                label={"Бренд"}
                name={"flavorBrand"}
                value={brand}
                onChange={(v) => setBrand(v.target.value)}
            />
            <TextField
                variant={"standard"}
                title={"Артикул"}
                label={"Артикул"}
                name={"flavorBrand"}
                value={articleNumber}
                onChange={(v) => setArticleNumber(v.target.value)}
            />

            <FormControl>
                <InputLabel id="flavor-sex-label">Пол</InputLabel>
                <Select
                    labelId={"flavor-sex-label"}
                    id={"flavor-sex"}
                    variant={"outlined"}
                    value={sex}
                    onChange={(v: SelectChangeEvent<Sex>) => setSex(v.target.value)}
                    title={"Пол"}
                    label={"Пол"}
                    name={"flavorSex"}
                >
                    <MenuItem value={sexValues[0]}>{sexTranslate?.[sexValues[0]]}</MenuItem>
                    <MenuItem value={sexValues[1]}>{sexTranslate?.[sexValues[1]]}</MenuItem>
                    <MenuItem value={sexValues[2]}>{sexTranslate?.[sexValues[2]]}</MenuItem>
                </Select>
            </FormControl>


            <FormControl>
                <InputLabel id="flavor-category-label">Категория</InputLabel>
                <Select
                    labelId={"flavor-category-label"}
                    id={"flavor-category"}
                    variant={"outlined"}
                    value={category}
                    onChange={(v: SelectChangeEvent<Category>) => setCategory(v.target.value)}
                    title={"Категория"}
                    label={"Категория"}
                    name={"flavorCategory"}
                >
                    <MenuItem value={categoryValues[0]}>{categoryValues[0]}</MenuItem>
                    <MenuItem value={categoryValues[1]}>{categoryValues[1]}</MenuItem>
                    <MenuItem value={categoryValues[2]}>{categoryValues[2]}</MenuItem>
                </Select>
            </FormControl>


            <FormControl>
                <InputLabel id="flavor-city-label">Город</InputLabel>
                <Select
                    labelId={"flavor-city-label"}
                    id={"flavor-city"}
                    variant={"outlined"}
                    value={cities?.find(city => city.id === cityId)?.name ?? ""}
                    onChange={(v: SelectChangeEvent) => {
                        const name = v.target.value
                        const id = cities?.find(city => city.name === name)?.id
                        id && setCityId(id)
                    }}
                    title={"Город"}
                    label={"Город"}
                    name={"flavorCategory"}
                >
                    {cities?.map(city => <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>)}
                </Select>
            </FormControl>


            <FormGroup>
                <FormLabel component="legend">Доступные объемы</FormLabel>
                <Stack direction={"row"}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={small} onChange={handleCheckboxChange} name={"30"}/>
                        }
                        label={"30"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={medium} onChange={handleCheckboxChange} name={"50"}/>
                        }
                        label={"50"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={big} onChange={handleCheckboxChange} name={"100"}/>
                        }
                        label={"100"}
                    />
                </Stack>

            </FormGroup>

        </Stack>
    </DialogLayout>
}

export default FlavorsEditDialog