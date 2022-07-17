import {FC, useCallback, useEffect} from "react";
import DialogLayout from "../../dialog";
import useStoreFlavorsDialog from "../../../stores/dialog/flavors-store";
import {createRecord, Flavor, IHPRecord, NewFlavor, updateRecord} from "thin-backend";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
// import * as RR from "fp-ts/ReadonlyRecord"
import {pipe} from "fp-ts/es6/function"
import * as A from "fp-ts/ReadonlyArray"
import * as S from "fp-ts/string"
import * as O from "fp-ts/Option"
import {useSnackbar} from "notistack";
import {makeRequest} from "../cities/dialog";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import Checkbox from "../../library/input/checkbox";
import useStoreCities from "../../../stores/cities";

const createFlavor = (newFlavor: NewFlavor) => () => createRecord("flavors", newFlavor)
const editFlavor = (flavor: Flavor) => () => updateRecord("flavors", flavor.id, flavor)


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

// type Volume = "30" | "50" | "100"
// const VolumeKeys: ReadonlyArray<string> = ["30", "50", "100"]

// type Volumes = RR.ReadonlyRecord<Volume, boolean>
// const defaultVolumes: Volumes = {
//     30: false,
//     50: false,
//     100: false,
// }


export const processArrayToString = (input: ReadonlyArray<string>) => pipe(
    input,
    A.intercalate(S.Monoid)(", "),
    arrayString => `{${arrayString}}`
)

export const isArrayLiteral = (input: string | undefined) => {
    // console.log("isArrayLiteral", input)
    return (input && input?.startsWith("{") && input?.endsWith("}")) ? O.some(input) : O.none
}

export const processStringToArray = (input: string): ReadonlyArray<string> => pipe(
    input,
    isArrayLiteral,
    O.fold(
        () => [],
        (input) => pipe(
            input,
            S.slice(1, input.length - 1),
            S.split(","),
            A.map(S.trim)
        )
    )
)

const getFlavor = (currentFlavor: Flavor, newFlavor: NewFlavor) => ({
    ...currentFlavor,
    ...newFlavor
})

type Inputs = NewFlavor & {
    volume: Array<string>
}

const FlavorsEditDialog: FC<Props> = ({onClose}) => {
    const {enqueueSnackbar} = useSnackbar()
    const isOpen = useStoreFlavorsDialog(state => state.isOpen)
    const mode = useStoreFlavorsDialog(state => state.mode)
    const currentFlavor = useStoreFlavorsDialog(state => state.flavor)
    const cities = useStoreCities(state => state.cities)
    const getCityByName = useStoreCities(state => state.getCityByName)
    const getCityById = useStoreCities(state => state.getCityById)

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        resetField,
        clearErrors
    } = useForm<Inputs>({
        defaultValues: {
            ...currentFlavor,
            cityId: getCityById(currentFlavor?.cityId ?? "")?.name ?? cities?.[0]?.name ?? ""
        }
    })

    const resetForm = useCallback(() => {
        reset({
            name: "",
            id: "",
            cityId: "",
            volume: "",
            brand: "",
            sex: "",
            articleNumber: "",
            category: "",
        })
        clearErrors()
    }, [reset, clearErrors, currentFlavor])

    const onSuccess = () => {
        enqueueSnackbar("Success", {variant: "success"})
        onClose()
        resetForm()
    }

    const onError = () => {
        enqueueSnackbar("Something went wrong", {variant: "error"})
    }

    const title = (mode === "create" ? "Создать" : "Изменить") + " аромат " + (currentFlavor?.articleNumber ?? "")


    useEffect(() => {
        setValue("name", currentFlavor?.name ?? "")
        setValue("brand", currentFlavor?.brand ?? "")
        setValue("articleNumber", currentFlavor?.articleNumber ?? "")
        setValue("sex", currentFlavor?.sex ?? sexValues[2])
        setValue("category", currentFlavor?.category ?? categoryValues[0])
        setValue("cityId", currentFlavor?.cityId ?? cities?.[0].name)
    }, [currentFlavor])

    const onSubmit: SubmitHandler<Inputs> = useCallback((data__) => {
        // TODO use fp-ts for that
        const data: NewFlavor = {
            ...data__,
            volume: processArrayToString(data__.volume),
            cityId: getCityByName(data__.cityId ?? "")?.id
        }

        const func: () => Promise<IHPRecord<"flavors">> =
            (mode === "edit" && currentFlavor) ?
                editFlavor(getFlavor(currentFlavor, data))
                : createFlavor(data)

        return makeRequest(func, onSuccess, onError)
    }, [mode, currentFlavor, onSuccess, onError])

    return <DialogLayout
        isOpen={isOpen}
        onClose={() => {
            onClose()
            resetForm()
            resetField("name")
        }}
        onCancel={() => {
            onClose()
            resetForm()
        }}
        onSubmit={handleSubmit(onSubmit)}
        title={title}
    >
        <Stack direction={'column'} spacing={2}>

            <Controller
                rules={{
                    required: {
                        message: "Название не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                name={"name"}
                render={({field}) => <TextField
                    label={"Название"}
                    title={"Название"}
                    variant={"standard"}
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />}
            />
            <Controller
                rules={{
                    required: {
                        message: "Бренд не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                name={"brand"}
                render={({field}) => <TextField
                    label={"Бренд"}
                    title={"Бренд"}
                    variant={"standard"}
                    {...field}
                    error={!!errors.brand}
                    helperText={errors.brand?.message}
                />}
            />


            <Stack direction={"row"} spacing={2}>
                <Controller
                    control={control}
                    name={"sex"}
                    render={({field}) => <FormControl fullWidth>
                        <InputLabel id="flavor-sex-label">Пол</InputLabel>
                        <Select
                            labelId={"flavor-sex-label"}
                            id={"flavor-sex"}
                            variant={"outlined"}
                            title={"Пол"}
                            label={"Пол"}
                            {...field}
                        >
                            <MenuItem value={sexValues[0]}>{sexTranslate?.[sexValues[0]]}</MenuItem>
                            <MenuItem value={sexValues[1]}>{sexTranslate?.[sexValues[1]]}</MenuItem>
                            <MenuItem value={sexValues[2]}>{sexTranslate?.[sexValues[2]]}</MenuItem>
                        </Select>
                    </FormControl>}
                />
                <Controller
                    rules={{
                        required: {
                            message: "Артикул не может быть пустым",
                            value: true,
                        }
                    }}
                    control={control}
                    name={"articleNumber"}
                    render={({field}) => <TextField
                        fullWidth
                        label={"Артикул"}
                        title={"Артикул"}
                        variant={"standard"}
                        {...field}
                        error={!!errors.articleNumber}
                        helperText={errors.articleNumber?.message}
                    />}
                />
            </Stack>

            <Stack direction={"row"} spacing={2}>
                <Controller
                    control={control}
                    name={"category"}
                    render={({field}) => <FormControl fullWidth>
                        <InputLabel id="flavor-category-label">Категория</InputLabel>
                        <Select
                            labelId={"flavor-category-label"}
                            id={"flavor-category"}
                            variant={"outlined"}
                            title={"Категория"}
                            label={"Категория"}
                            {...field}
                        >
                            <MenuItem value={categoryValues[0]}>{categoryValues[0]}</MenuItem>
                            <MenuItem value={categoryValues[1]}>{categoryValues[1]}</MenuItem>
                            <MenuItem value={categoryValues[2]}>{categoryValues[2]}</MenuItem>
                        </Select>
                    </FormControl>}
                />
                <Controller
                    rules={{
                        required: {
                            message: "Город не может быть пустым",
                            value: true,
                        }
                    }}
                    control={control}
                    render={({field}) => <FormControl fullWidth>
                        <InputLabel id="flavor-city-label">Город</InputLabel>
                        <Select
                            labelId={"flavor-city-label"}
                            id={"flavor-city"}
                            variant={"outlined"}
                            title={"Город"}
                            label={"Город"}
                            {...field}
                            error={!!errors.cityId}
                            value={cities?.find(city => city.id === field.value)?.name}
                        >
                            {cities?.map(city => <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>)}
                        </Select>
                    </FormControl>}
                    name={"cityId"}
                />

            </Stack>
            <Checkbox<Inputs>
                options={["30", "50", "100"]}
                control={control}
                name={"volume"}
                values={processStringToArray(currentFlavor?.volume ?? "")}
            />
        </Stack>
    </DialogLayout>
}

export default FlavorsEditDialog