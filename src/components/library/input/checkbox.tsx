import FormLabel from "@mui/joy/FormLabel";
import Checkbox from "@mui/joy/Checkbox"
import Stack from "@mui/joy/Stack"
import Box from "@mui/joy/Box";
import {FC} from "react";

interface Props {
    options: ReadonlyArray<string>,
    values: ReadonlyArray<string>,
    onChange: (value: string) => void,
    label?: string,
}

const Checkboxes: FC<Props> = ({options, values, onChange, label}) => {

    return <Box marginTop={1}>
        {label && <FormLabel component={"legend"}>{label}</FormLabel>}
        <Stack direction={"row"} spacing={2}>
            {options.map(option => <Checkbox
                key={option}
                checked={values.includes(option)}
                onChange={() => onChange(option)}
                label={option}
                title={option}
            />)}
        </Stack>
    </Box>
}

export default Checkboxes