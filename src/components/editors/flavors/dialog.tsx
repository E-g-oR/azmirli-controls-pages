import {FC, useCallback, useEffect, useMemo, useState} from "react";
import DialogLayout from "../../dialog/dialog";
import useStoreFlavorsDialog, {BaseData, useStoreCreateFlavor} from "../../../storage/dialog/flavors-store";
import {pipe} from "fp-ts/es6/function"
import * as A from "fp-ts/ReadonlyArray"
import * as S from "fp-ts/string"
import * as O from "fp-ts/Option"
import {useForm} from "react-hook-form"
import {match} from "ts-pattern";
import Step1 from "./steps/step-1";
import Typography from "@mui/joy/Typography";
import {AnimatePresence} from "framer-motion";
import IconButton from "@mui/joy/IconButton";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import Button from "@mui/joy/Button";
import Step2, {GroupedStores, SimpleStore} from "./steps/step-2";
import Step3 from "./steps/step-3";

import * as RR from "fp-ts/es6/ReadonlyRecord"
import {Mode} from "../../../storage/dialog/cities-store";
import {UUID} from "thin-backend";
import {MobileStepper} from "@mui/material";

// const createFlavor = (newFlavor: NewFlavor) => () => createRecord("flavors", newFlavor)
// const editFlavor = (flavor: Flavor) => () => updateRecord("flavors", flavor.id, flavor)

// Promise.
interface Props {
    onClose: () => void,
}

export type Sex = "men" | "women" | "unisex"
type SexRussian = "мужской" | "женский" | "унисекс"
export const sexValues: ReadonlyArray<Sex> = ["women", "men", "unisex"] as const
export const sexTranslate: Record<Sex, SexRussian> = {
    women: "женский",
    men: "мужской",
    unisex: "унисекс",
}

// type ArticleNumber = `${number}${string}`


type Category = "lux" | "selective" | "exclusive"
export const categoryValues: ReadonlyArray<Category> = ["lux", "exclusive", "selective"] as const

// type Volume = "30" | "50" | "100"
// export const defaultVolumes: Array<Volume> = ["30", "50", "100"]

export const processArrayToString = (input: ReadonlyArray<string>) => pipe(
    input,
    A.map(S.trim),
    A.filter(item => !!item),
    A.intercalate(S.Monoid)(", "),
    arrayString => `{${arrayString}}`
)

export const isArrayLiteral = (input: string | undefined) =>
    (input && input?.startsWith("{") && input?.endsWith("}")) ?
        O.some(input)
        : O.none


export const processStringToArray = (input: string | Array<string>): ReadonlyArray<string> => Array.isArray(input) ? input : pipe(
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

interface PreparedData extends BaseData {
    cityId: UUID,
    storeId: UUID,
    volume: string,     // postgres array literal
}

const getPreparedData = (baseData: BaseData, cityId: UUID, simpleStore: SimpleStore): PreparedData => ({
    ...baseData,
    cityId,
    storeId: simpleStore.storeId,
    volume: processArrayToString(simpleStore.volumes ?? []),
})

type FlavorEntry = readonly [cityId: UUID, simpleStores: ReadonlyArray<SimpleStore>]
const modifyFlavorsEntry = (baseData: BaseData) =>
    ([cityId, simpleStores]: FlavorEntry): ReadonlyArray<PreparedData> =>
        pipe(
            simpleStores,
            A.map(simpleStore => getPreparedData(baseData, cityId, simpleStore))
        )

// const modifySimpleStores = (simpleStores)
const onSubmit = (mode: Mode, baseData: BaseData, editedFlavors: GroupedStores) => {
    if (mode === "create") {
        const data = pipe(
            editedFlavors,
            RR.toEntries,
            A.map(modifyFlavorsEntry(baseData)),
            A.flatten,
        )
        console.log(data)
    } else {
        console.error("not implemented yet")
    }
}

const FlavorsEditDialog: FC<Props> = ({onClose}) => {
    const isOpen = useStoreFlavorsDialog(state => state.isOpen)
    const mode = useStoreFlavorsDialog(state => state.mode)
    const currentFlavor = useStoreFlavorsDialog(state => state.flavor)

    const baseData = useStoreCreateFlavor(state => state.baseData)
    const setBaseData = useStoreCreateFlavor(state => state.setData)

    const goBack = useStoreCreateFlavor(state => state.goBack)
    const goNext = useStoreCreateFlavor(state => state.goNext)

    const {
        control: baseDataControl,
        reset: resetBaseData,
        handleSubmit: handleSubmitBaseData
    } = useForm<BaseData>({
        defaultValues: baseData,
    })

    const currentStep = useStoreCreateFlavor(state => state.currentStep)
    const steps = useStoreCreateFlavor(state => state.steps)

    const selectedStores = useStoreCreateFlavor(state => state.selectedStores)

    const [values, setValues] = useState<ReadonlyArray<string>>([])

    const handleChange = useCallback((newValue: string) =>
        setValues(prevState =>
            prevState.some(item => item === newValue) ?
                pipe(
                    prevState,
                    A.filter(item => item !== newValue)
                )
                : pipe(
                    prevState,
                    A.append(newValue)
                )
        ), [setValues])

    const handleSubmitStores = useCallback((onSuccess: () => void) => pipe(
        selectedStores,
        RR.keys,
        keys => keys.length > 0 && onSuccess()
    ), [selectedStores])

    useEffect(() => {
        resetBaseData(baseData)
    }, [baseData])


    const title = (mode === "create" ? "Создать" : "Изменить") + " аромат " + (currentFlavor?.articleNumber ?? "")

    // const submit = useCallback

    const actions = useMemo(() => <MobileStepper
        steps={steps.length}
        activeStep={currentStep}
        sx={{
            width: "100%",
            marginX: 1,
        }}
        position={"static"}
        variant={"progress"}
        backButton={
            <IconButton
                color={"neutral"}
                variant={"outlined"}
                disabled={currentStep === 0}
                onClick={goBack}
            >
                <ChevronLeft/>
            </IconButton>
        }
        nextButton={
            match(currentStep)
                .with(0, () => <IconButton onClick={handleSubmitBaseData((data) => {
                    setBaseData(data)
                    goNext()
                })}>
                    <ChevronRight/>
                </IconButton>)
                .with(1, () => <IconButton onClick={() => handleSubmitStores(goNext)}>
                    <ChevronRight/>
                </IconButton>)
                .with(2, () => <Button
                    variant={"solid"}
                    onClick={() => onSubmit(mode, baseData, selectedStores)}
                >Закончить</Button>)
                .otherwise(() => null)
        }

    />, [currentStep, handleSubmitBaseData, handleSubmitStores])

    return <DialogLayout
        isOpen={isOpen}
        onClose={() => {
            onClose()
        }}
        onCancel={() => {
            onClose()
        }}
        onSubmit={() => {
            console.log("submit")
        }}
        title={title}
        actions={actions}
    >

        <AnimatePresence>
            <Typography
                fontWeight={"bold"}
                key={"step_name"}
            > {currentStep + 1}. {steps[currentStep] ?? "Вы вышли за пределы"}</Typography>
            {
                match(currentStep)
                    .with(0, () => <Step1 control={baseDataControl}/>)
                    .with(1, () => <Step2 selected={values} onChange={handleChange} setValues={setValues}/>)
                    .with(2, () => <Step3/>)
                    .otherwise(() => <Typography>Вы вышли за пределы</Typography>)
            }
        </AnimatePresence>

    </DialogLayout>
}

export default FlavorsEditDialog

