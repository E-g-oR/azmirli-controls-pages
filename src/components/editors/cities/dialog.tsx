import {FC, useCallback, useEffect, useState} from "react";
import useStoreDialogCity from "../../../stores/dialog/cities-store";
import DialogLayout from "../../dialog";
import {City, createRecord, NewCity, updateRecord} from "thin-backend";
import {Stack, TextField} from "@mui/material";

const createCity = (city: NewCity) => createRecord("cities", city)
const editCity = (city: City) => updateRecord("cities", city.id, city)

interface Props {
    onClose: () => void,
}

const CitiesDialog: FC<Props> = ({onClose}) => {
    const mode = useStoreDialogCity(state => state.mode)
    const isOpen = useStoreDialogCity(state => state.isOpen)
    const currentCity = useStoreDialogCity(state => state.city)

    const [name, setName] = useState(currentCity?.name ?? "")
    const [subDomain, setSubDomain] = useState(currentCity?.subDomain ?? "")
    const [instagram, setInstagram] = useState(currentCity?.instagram ?? "")
    const [facebook, setFacebook] = useState(currentCity?.facebook ?? "")
    const [vkontakte, setVkontakte] = useState(currentCity?.vkontakte ?? "")

    const newCity: NewCity = {
        name,
        subDomain,
        facebook,
        instagram,
        vkontakte
    }

    const onSubmit = useCallback(
        () => mode === "create" ?
            createCity(newCity)
            : (currentCity && editCity({...currentCity, ...newCity}))
        , [mode, newCity, currentCity])


    useEffect(() => {
        setName(currentCity?.name ?? "")
        setSubDomain(currentCity?.subDomain ?? "")
        setInstagram(currentCity?.instagram ?? "")
        setFacebook(currentCity?.facebook ?? "")
        setVkontakte(currentCity?.vkontakte ?? "")
    }, [currentCity])

    const title = (mode === "create" ? "Создать" : "Изменить") + " город " + (currentCity ? currentCity.name : "")

    return <DialogLayout
        isOpen={isOpen}
        title={title}
        onCancel={onClose}
        onClose={onClose}
        onSubmit={onSubmit}
    >
        <Stack direction={"column"} flexWrap={"wrap"} spacing={3}>

            <TextField
                variant={"standard"}
                title={"Название"}
                label={"Название"}
                name={"cityName"}
                value={name}
                onChange={(v) => setName(v.target.value)}
            />
            <TextField
                variant={"standard"}
                title={"Поддомен"}
                label={"Поддомен"}
                name={"citySubDomain"}
                value={subDomain}
                onChange={(v) => setSubDomain(v.target.value)}
            />
            <TextField
                variant={"standard"}
                title={"Инстаграм"}
                label={"Инстаграм"}
                name={"cityInstagram"}
                value={instagram}
                onChange={(v) => setInstagram(v.target.value)}
            />
            <TextField
                variant={"standard"}
                title={"Фейсбук"}
                label={"Фейсбук"}
                name={"cityFacebook"}
                value={facebook}
                onChange={(v) => setFacebook(v.target.value)}
            />
            <TextField
                variant={"standard"}
                title={"ВКонтакте"}
                label={"ВКонтакте"}
                name={"cityVkontakte"}
                value={vkontakte}
                onChange={(v) => setVkontakte(v.target.value)}
            />

        </Stack>

    </DialogLayout>
}

export default CitiesDialog