import {FC, ReactNode} from "react";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/joy/Button";
import Divider from "@mui/material/Divider";
import {Close} from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import {Stack} from "@mui/material";

interface Props {
    isOpen: boolean,
    onSubmit: () => void,
    onCancel: () => void,
    onClose?: () => void,
    children: ReactNode,
    title?: string,
}

const DialogLayout: FC<Props> = ({children, onCancel, onSubmit, onClose, isOpen, title}) => {
    return <Dialog
        open={isOpen}
        fullWidth
        maxWidth={"sm"}
        onKeyUp={(v) => v.key === "Escape" && onCancel()}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
    >
        {
            title && <>
                <DialogTitle
                    id="scroll-dialog-title"
                    textTransform={"capitalize"}
                >
                    {title}
                </DialogTitle>
                {onClose ? <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 10,
                        top: 10
                    }}
                    variant={"plain"}
                >
                    <Close/>
                </IconButton> : null}
                <Divider/>
            </>
        }
        <DialogContent
            dividers={true}
            tabIndex={-1}
        >
            <Stack
                direction={"column"}
                spacing={{xs: 1, sm: 2}}
                overflow={"auto"}
            >
                {children}
            </Stack>
        </DialogContent>
        <Divider/>
        <DialogActions>
            <Button
                variant={"outlined"}
                onClick={onCancel}
            >
                отмена
            </Button>
            <Button
                variant={"solid"}
                type={"submit"}
                onClick={onSubmit}
            >
                Подтвердить
            </Button>
        </DialogActions>
    </Dialog>
}

export default DialogLayout