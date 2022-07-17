import {FC, ReactNode} from "react";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Button, DialogActions, Divider, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";

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
    >
        {
            title && <>
                <DialogTitle textTransform={"capitalize"}>{title}</DialogTitle>
                {onClose ? <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 10,
                        top: 10
                    }}
                >
                    <Close/>
                </IconButton> : null}
                <Divider/>
            </>
        }
        <form onSubmit={onSubmit}>
            <DialogContent>
                {children}
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button variant={"outlined"} onClick={onCancel}>отмена</Button>
                <Button variant={"contained"} type={"submit"}>Подтвердить</Button>
            </DialogActions>
        </form>
    </Dialog>
}

export default DialogLayout