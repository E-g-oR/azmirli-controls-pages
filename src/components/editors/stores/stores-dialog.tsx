import {FC, useCallback, useEffect, useMemo} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import DialogLayout from "../../dialog/dialog";
import useStoreStores from "../../../stores/dialog/stores-store";
import {
    Box,
    FormLabel,
    Stack,
} from "@mui/material";
import useStoreCities from "../../../stores/cities";
import {createRecord, IHPRecord, NewStore, Store, updateRecord} from "thin-backend";
import {useSnackbar} from "notistack";
import {makeRequest} from "../cities/cities-dialog";
import TextField from "@mui/joy/TextField";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";


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
            control={control}
            name={"cityName"}
            render={({field}) => <Select
                variant={"soft"}
                {...field}
                componentsProps={{
                    listbox: {
                        sx: {
                            maxHeight: 240,
                            overflow: 'auto',
                            '--List-padding': '0px',
                        }
                    }
                }}
            >
                {cities?.map(city => <Option value={city.name} key={city.id}>{city.name}</Option>)}
            </Select>
            }
        />
        <Stack
            direction={{xs: "column", sm: "row"}}
            spacing={{xs: 1, sm: 2}}
            alignItems={{xs: "stretch", sm: "flex-end"}}
        >
            <Controller
                control={control}
                name={"streetType"}
                render={({field}) => <Box
                    sx={{
                        width: {
                            xs: "100%", sm: 130,
                        },
                        minWidth: {
                            xs: "100%", sm: 130,
                        },
                        maxWidth: {
                            xs: "100%", sm: 130,
                        },
                    }}
                >
                    <Select
                        variant={"soft"}
                        {...field}
                        componentsProps={{
                            listbox: {
                                sx: {
                                    maxHeight: 240,
                                    overflow: 'auto',
                                    '--List-padding': '0px',
                                }
                            }
                        }}
                    >
                        {streetTypes?.map(type => <Option value={type} key={type}>{type}</Option>)}
                    </Select>
                </Box>
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
                    variant={"soft"}
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
                render={({field, fieldState}) =>
                    <Box
                        sx={{
                            width: {
                                xs: "100%", sm: 100,
                            },
                        }}
                    >
                        <TextField
                            label={"Здание"}
                            variant={"soft"}
                            {...field}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    </Box>
                }
            />
        </Stack>
        <Controller
            name={"comment"}
            control={control}
            render={({field, fieldState}) => <TextField
                label={"Коментарий"}
                variant={"soft"}
                fullWidth
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
            />}
        />
        <Stack
            direction={"column"}
        >
            <FormLabel
                sx={{
                    marginTop: 1
                }}
            >
                Рабочее время:
            </FormLabel>
            <Stack
                direction={{xs: "column", sm: "row"}}
                spacing={{xs: 1, sm: 2}}
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
                        variant={"soft"}
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
                        variant={"soft"}
                        // fullWidth
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />}
                />
            </Stack>
        </Stack>


    </DialogLayout>
}

export default StoresDialog