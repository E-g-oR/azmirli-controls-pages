import {FC, useCallback, useEffect, useMemo} from "react";
import useStoreDialogCity from "../../../stores/dialog/cities-store";
import DialogLayout from "../../dialog/dialog";
import {City, createRecord, IHPRecord, NewCity, updateRecord} from "thin-backend";
import {Stack} from "@mui/material";
import {useSnackbar} from "notistack";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {match} from "ts-pattern";
import TextField from "@mui/joy/TextField";

// TODO move it to utils file
export function makeRequest<T>(request: () => Promise<T>, onSuccess: () => void, onError: () => void) {
    return request()
        .then(() => onSuccess())
        .catch(err => {
            console.log("ошибка", err)
            onError()
        })
}

const createCity = (city: NewCity) => () => createRecord("cities", city)
const editCity = (city: City) => () => updateRecord("cities", city.id, city)


interface Props {
    onClose: () => void,
}

const getCity = (currentCity: City, newCity: NewCity): City => ({
    ...currentCity,
    ...newCity
})


const CitiesDialog: FC<Props> = ({onClose}) => {


    const {enqueueSnackbar} = useSnackbar()


    const mode = useStoreDialogCity(state => state.mode)
    const isOpen = useStoreDialogCity(state => state.isOpen)
    const currentCity = useStoreDialogCity(state => state.city)

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        reset,
        clearErrors
    } = useForm<NewCity>({
        defaultValues: {
            name: currentCity?.name ?? "",
            subDomain: currentCity?.subDomain ?? "",
            instagram: currentCity?.instagram ?? "",
            facebook: currentCity?.facebook ?? "",
            vkontakte: currentCity?.vkontakte ?? "",
            id: currentCity?.id,
        }
    })

    const resetForm = useCallback(() => {
        reset()
        clearErrors()
    }, [reset, clearErrors])


    const message = useMemo(() => mode === "edit" ? "Запись изменена!" : "Запись создана!", [mode])

    const onSuccess = () => {
        enqueueSnackbar(message, {variant: "success"})
        onClose()
        resetForm()
    }

    const onError = () => {
        enqueueSnackbar("Что-то пошло не так", {variant: "error"})
    }

    useEffect(() => {
        setValue("id", currentCity?.id)
        setValue("name", currentCity?.name ?? "")
        setValue("subDomain", currentCity?.subDomain ?? "")
        setValue("instagram", currentCity?.instagram ?? "")
        setValue("vkontakte", currentCity?.vkontakte ?? "")
        setValue("facebook", currentCity?.facebook ?? "")
    }, [currentCity])

    useEffect(() => {
        mode === "create" && resetForm()
    }, [mode])

    const title = (mode === "create" ? "Создать" : "Изменить") + " город " + (currentCity ? currentCity.name : "")

    const onSubmit: SubmitHandler<NewCity> = useCallback((data) => {
        const func: () => Promise<IHPRecord<"cities">> = match(mode)
            .with("create", () => createCity(data))
            .with("edit", () => currentCity ? editCity(getCity(currentCity, data)) : createCity(data))
            .exhaustive()

        return makeRequest(func, onSuccess, onError)
    }, [currentCity, mode])


    return <DialogLayout
        isOpen={isOpen}
        title={title}
        onCancel={() => {
            onClose()
            resetForm()
        }}
        onClose={() => {
            onClose()
            resetForm()
        }}
        onSubmit={handleSubmit(onSubmit)}
    >
        <Stack
            direction={{xs: "column", sm: "row"}}
            spacing={{xs: 1, sm: 2}}

        >
            <Controller
                name={"name"}
                rules={{
                    required: {
                        message: "Название не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                render={({field}) => <TextField
                    label={"Название"}
                    variant={"soft"}
                    fullWidth
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />}
            />
            <Controller
                name={"subDomain"}
                rules={{
                    required: {
                        message: "Поддомен не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                render={({field}) => <TextField
                    label={"Поддомен"}
                    variant={"soft"}
                    fullWidth
                    {...field}
                    error={!!errors.subDomain}
                    helperText={errors.subDomain?.message}
                />}
            />
        </Stack>
        <Controller
            name={"instagram"}
            control={control}
            render={({field}) => <TextField label={"Инстаграм"} variant={"soft"} {...field} />}
        />
        <Controller
            name={"vkontakte"}
            control={control}
            render={({field}) => <TextField label={"ВКонтакте"} variant={"soft"} {...field} />}
        />
        <Controller
            name={"facebook"}
            control={control}
            render={({field}) => <TextField label={"Фейсбук"} variant={"soft"} {...field} />}
        />
    </DialogLayout>
}

export default CitiesDialog