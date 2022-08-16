import {useState} from "react";
import {Control, Path, useController} from "react-hook-form";
import {FormControlLabel, FormGroup, FormLabel, Stack} from "@mui/material";

import {Checkbox as CheckboxMUI} from "@mui/material";

interface Props<C> {
    options: ReadonlyArray<string>,
    control: Control<C, object>,
    name: Path<C>,
    values: ReadonlyArray<string>,
}

function Checkbox<C>({options, name, control, values}: Props<C>) {
    const {field} = useController({
        control,
        name,
    })
    const [value, setValue] = useState<Array<string>>(values as Array<string>)

    return <FormGroup>
        <FormLabel component={"legend"}>Доступные объемы</FormLabel>
        <Stack direction={"row"}>
            {options.map(option => <FormControlLabel
                control={<CheckboxMUI
                    checked={value.includes(option)}
                    onChange={(e) => {
                        // TODO use fp-ts
                        setValue(prev => {
                            const next = !prev.includes(e.target.value) ? [...prev, e.target.value] : prev.filter(item => item !== e.target.value)
                            field.onChange(next)
                            return next
                        })
                    }}
                    name={option}
                    title={option}
                />}
                key={option}
                label={option}
                value={option}
            />)}
        </Stack>
    </FormGroup>
}

export default Checkbox