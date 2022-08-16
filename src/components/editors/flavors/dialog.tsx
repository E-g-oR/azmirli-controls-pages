import {FC, useEffect, useMemo} from "react";
import DialogLayout from "../../dialog/dialog";
import useStoreFlavorsDialog, {BaseData, useStoreCreateFlavor} from "../../../storage/dialog/flavors-store";
// import {createRecord, Flavor, IHPRecord, NewFlavor, updateRecord} from "thin-backend";
import {
    // Stack,
} from "@mui/material";
import {pipe} from "fp-ts/es6/function"
import * as A from "fp-ts/ReadonlyArray"
import * as S from "fp-ts/string"
import * as O from "fp-ts/Option"
import {useForm} from "react-hook-form"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Stack from "@mui/joy/Stack";
import {match} from "ts-pattern";
import Step1 from "./steps/step-1";
import Typography from "@mui/joy/Typography";
import {AnimatePresence} from "framer-motion";
import IconButton from "@mui/joy/IconButton";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import Button from "@mui/joy/Button";
import Step2 from "./steps/step-2";

// const createFlavor = (newFlavor: NewFlavor) => () => createRecord("flavors", newFlavor)
// const editFlavor = (flavor: Flavor) => () => updateRecord("flavors", flavor.id, flavor)

// Promise.
interface Props {
    onClose: () => void,
}

type Sex = "men" | "women" | "unisex"
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

// export const processArrayToString = (input: ReadonlyArray<string>) => pipe(
//     input,
//     A.map(S.trim),
//     A.filter(item => !!item),
//     A.intercalate(S.Monoid)(", "),
//     arrayString => `{${arrayString}}`
// )

export const isArrayLiteral = (input: string | undefined) => {
    // console.log("isArrayLiteral", input)
    return (input && input?.startsWith("{") && input?.endsWith("}")) ? O.some(input) : O.none
}

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

const FlavorsEditDialog: FC<Props> = ({onClose}) => {
    const isOpen = useStoreFlavorsDialog(state => state.isOpen)
    const mode = useStoreFlavorsDialog(state => state.mode)
    const currentFlavor = useStoreFlavorsDialog(state => state.flavor)

    const baseData = useStoreCreateFlavor(state => state.baseData)

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

    useEffect(() => {
        resetBaseData(baseData)
    }, [baseData])


    const title = (mode === "create" ? "Создать" : "Изменить") + " аромат " + (currentFlavor?.articleNumber ?? "")

    const actions = useMemo(() => <Stack
        direction={"row"}
        sx={{
            justifyContent: "space-between",
            width: "100%",
            marginX: 2,
        }}
    >
        <IconButton
            color={"neutral"}
            variant={"outlined"}
            disabled={currentStep === 0}
            onClick={goBack}
        >
            <ChevronLeft/>
        </IconButton>
        {
            currentStep < steps.length - 1 ?
                <IconButton onClick={handleSubmitBaseData(goNext)}>
                    <ChevronRight/>
                </IconButton>
                : <Button variant={"solid"}>Закончить</Button>
        }

    </Stack>, [currentStep, handleSubmitBaseData])

    return <DialogLayout
        isOpen={isOpen}
        onClose={() => {
            onClose()
            // resetForm()
            // resetField("name")
        }}
        onCancel={() => {
            onClose()
            // resetForm()
        }}
        onSubmit={() => {
            console.log("submit")
        }}
        title={title}
        actions={actions}
    >
        <Stepper activeStep={currentStep}>
            {
                steps.map(stepName => <Step key={stepName}>
                    <StepLabel>{stepName}</StepLabel>
                </Step>)
            }
        </Stepper>
        <AnimatePresence>
            {
                match(currentStep)
                    .with(0, () => <Step1 control={baseDataControl}/>)
                    .with(1, () => <Step2/>)
                    .otherwise(() => <Typography>Вы вышли за пределы</Typography>)
            }
        </AnimatePresence>

    </DialogLayout>
}

export default FlavorsEditDialog

