import {FC} from "react";
import {Control, Controller} from "react-hook-form";
import {BaseData} from "../../../../storage/dialog/flavors-store";
import TextField from "@mui/joy/TextField";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {categoryValues, sexTranslate, sexValues} from "../dialog";
import {motion} from "framer-motion";

interface Props {
    // eslint-disable-next-line
    control: Control<BaseData, Object>
}

const Step1: FC<Props> = ({control}) => {

    return <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
        <Stack direction={"column"} spacing={2}>
            <Controller
                rules={{
                    required: {
                        message: "Название не может быть пустым",
                        value: true,
                    }
                }}
                control={control}
                name={"name"}
                render={({field, fieldState}) => <TextField
                    label={"Название"}
                    title={"Название"}
                    placeholder={"Angel ou Demon Le Secret"}
                    variant={"soft"}
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
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
                render={({field, fieldState}) => <TextField
                    label={"Бренд"}
                    title={"Бренд"}
                    placeholder={"Givenchy"}
                    variant={"soft"}
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />}
            />
            <Stack direction={"row"} spacing={2}>
                <Controller
                    control={control}
                    name={"category"}
                    render={({field}) => <Box
                        sx={{
                            width: {xs: "100%", sm: 130,},
                            minWidth: {xs: "100%", sm: 130,},
                            maxWidth: {xs: "100%", sm: 130,},
                        }}
                    >
                        <FormLabel>Категория</FormLabel>
                        <Select
                            variant={"soft"}
                            {...field}
                            componentsProps={{
                                listbox: {
                                    sx: {
                                        maxHeight: 240,
                                        overflow: "auto",
                                        '--List-padding': '0px',
                                    }
                                }
                            }}
                        >
                            {categoryValues.map(value => <Option key={value} value={value}>{value}</Option>)}
                        </Select>
                    </Box>}
                />
                <Controller
                    control={control}
                    name={"sex"}
                    render={({field}) => <Box
                        sx={{
                            width: {xs: "100%", sm: 130,},
                            minWidth: {xs: "100%", sm: 130,},
                            maxWidth: {xs: "100%", sm: 130,},
                        }}
                    >
                        <FormLabel>Пол</FormLabel>
                        <Select
                            variant={"soft"}
                            {...field}
                            componentsProps={{
                                listbox: {
                                    sx: {
                                        maxHeight: 240,
                                        overflow: "auto",
                                        '--List-padding': '0px',
                                    }
                                }
                            }}
                        >
                            {sexValues.map(value => <Option key={value}
                                                            value={value}>{sexTranslate?.[value]}</Option>)}
                        </Select>
                    </Box>}
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
                    render={({field, fieldState}) => <TextField
                        fullWidth
                        label={"Артикул"}
                        title={"Артикул"}
                        placeholder={"777C"}
                        variant={"soft"}
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />}
                />
            </Stack>
        </Stack>
    </motion.div>
}

export default Step1