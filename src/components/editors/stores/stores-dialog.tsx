import {FC, useCallback, useEffect, useMemo} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import DialogLayout from "../../dialog/dialog";
import useStoreStores from "../../../stores/dialog/stores-store";
import {FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import useStoreCities from "../../../stores/cities";
import {createRecord, IHPRecord, NewStore, Store, updateRecord} from "thin-backend";
import {useSnackbar} from "notistack";
import {makeRequest} from "../cities/cities-dialog";

const createStore = (newStore: NewStore) => () => createRecord("stores", newStore)
// TODO make common template for those functions
const editStore = (store: Store) => () => updateRecord("stores", store.id, store)

type StreetType = "улица" | "проспект" | "переулок"
const streetTypes: ReadonlyArray<StreetType> = ["улица", "переулок", "проспект"]

interface Inputs {
    cityName: string,
    comment: string,
    workingTimeEnd: string,
    workingTimeStart: string,
    building: string,
    streetName: string,
    streetType: string,
}

const defaultValues: Inputs = {
    cityName: "",
    building: "",
    comment: "",
    streetName: "",
    streetType: streetTypes[0],
    workingTimeStart: "9",
    workingTimeEnd: "21",
}

const StoresDialog: FC = () => {
    const {enqueueSnackbar} = useSnackbar()
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        clearErrors
    } = useForm<Inputs>({
        defaultValues
    })
    const mode = useStoreStores(state => state.mode)
    const isOpen = useStoreStores(state => state.isOpen)
    const currentStore = useStoreStores(state => state.currentStore)
    const setIsOpen = useStoreStores(state => state.setIsOpen)
    const clearCurrentStore = useStoreStores(state => state.clearCurrentStore)

    const getCityById = useStoreCities(state => state.getCityById)
    const getCityByName = useStoreCities(state => state.getCityByName)
    const cities = useStoreCities(state => state.cities)

    const resetForm = useCallback(() => {
        reset(defaultValues)
        clearErrors()
    }, [reset, clearErrors])

    const onClose = () => {
        resetForm()
        setIsOpen(false)
        clearCurrentStore()
    }

    useEffect(() => {
        setValue("streetType", currentStore?.streetType ?? defaultValues.streetType)
        setValue("streetName", currentStore?.streetName ?? defaultValues.streetName)
        setValue("building", currentStore?.building ?? defaultValues.building)
        setValue("comment", currentStore?.comment ?? defaultValues.comment)
        setValue("workingTimeStart", currentStore?.workingTimeStart ?? defaultValues.workingTimeStart)
        setValue("workingTimeEnd", currentStore?.workingTimeEnd ?? defaultValues.workingTimeEnd)
        setValue("cityName", getCityById(currentStore?.cityId ?? "")?.name ?? defaultValues.cityName)
    }, [currentStore])

    const onSuccess = () => {
        enqueueSnackbar("Success", {variant: "success"})
        onClose()
        resetForm()
    }

    const onError = () => {
        enqueueSnackbar("Something went wrong", {variant: "error"})
    }

    const formTitle = useMemo(() => `${mode === "create" ? "Создать" : "Изменить"} магазин`, [mode])

    const onSubmit: SubmitHandler<Inputs> = useCallback((data__) => {
        const {
            workingTimeEnd,
            workingTimeStart,
            comment,
            building,
            streetType,
            streetName,
            cityName
        } = data__

        const data: NewStore = {
            workingTimeStart,
            workingTimeEnd,
            comment,
            building,
            streetType,
            streetName,
            cityId: getCityByName(cityName)?.id ?? ""
        }

        const func: () => Promise<IHPRecord<"stores">> =
            (mode === "edit" && currentStore) ?
                editStore({
                    ...currentStore,
                    ...data
                })
                : createStore(data)

        return makeRequest(func, onSuccess, onError)
    }, [mode, currentStore, onSuccess, onError])

    return <DialogLayout
        isOpen={isOpen}
        onClose={onClose}
        onCancel={onClose}
        onSubmit={handleSubmit(onSubmit)}
        title={formTitle}
    >
        <FormLabel>Адрес</FormLabel>
        <Controller
            name={"cityName"}
            rules={{
                required: {
                    message: "Город не может быть пустым",
                    value: true,
                }
            }}
            control={control}
            render={({field, fieldState}) => <FormControl
                fullWidth
                error={!!fieldState.error}
            >
                <InputLabel id={"store-city-name"}>Город</InputLabel>
                <Select
                    labelId={"store-city-name"}
                    id={"city-name"}
                    variant={"outlined"}
                    title={"Город"}
                    label={"Город"}
                    {...field}
                    MenuProps={{
                        sx: {
                            maxHeight: 300
                        }
                    }}
                >
                    {cities?.map(city => <MenuItem key={city.id} value={city.name}>
                        {city.name}
                    </MenuItem>)}
                </Select>
                {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
            </FormControl>}
        />
        <Stack
            direction={"row"}
            spacing={3}
        >
            <Controller
                name={"streetType"}
                rules={{
                    required: {
                        message: "Тип улицы не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                render={({field}) =>
                    <FormControl sx={{width: 270}}>
                        <InputLabel id={"store-street-type"}>Тип</InputLabel>
                        <Select
                            labelId={"store-street-type"}
                            id={"street-type"}
                            variant={"outlined"}
                            title={"Тип"}
                            label={"Тип"}
                            {...field}
                        >
                            {streetTypes.map(type => <MenuItem
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                }
            />
            <Controller
                name={"streetName"}
                rules={{
                    required: {
                        message: "Название улицы не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                render={({field, fieldState}) => <TextField
                    label={"Улица"}
                    variant={"filled"}
                    fullWidth
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />}
            />
            <Controller
                name={"building"}
                rules={{
                    required: {
                        message: "Номер здания не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                render={({field, fieldState}) => <TextField
                    label={"Здание"}
                    variant={"filled"}
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />}
            />
        </Stack>
        <Controller
            name={"comment"}
            control={control}
            render={({field, fieldState}) => <TextField
                label={"Коментарий"}
                variant={"filled"}
                fullWidth
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />}
        />
        <FormLabel>Рабочее время:</FormLabel>
        <Stack
            direction={"row"}
            spacing={3}
        >
            <Controller
                name={"workingTimeStart"}
                control={control}
                rules={{
                    required: {
                        message: "Время не может быть пустым",
                        value: true,
                    }
                }}
                render={({field, fieldState}) => <TextField
                    label={"Начало"}
                    variant={"filled"}
                    // fullWidth
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />}
            />
            <Controller
                name={"workingTimeEnd"}
                control={control}
                rules={{
                    required: {
                        message: "Время не может быть пустым",
                        value: true,
                    }
                }}
                render={({field, fieldState}) => <TextField
                    label={"Конец"}
                    variant={"filled"}
                    // fullWidth
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />}
            />
        </Stack>


    </DialogLayout>
}

export default StoresDialog