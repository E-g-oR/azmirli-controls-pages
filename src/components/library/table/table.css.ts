import {globalStyle, style} from "@vanilla-extract/css";

export const table = style({
    width: "100%",
    textAlign: "left",
    borderCollapse: "collapse",
})

export const tr = style({
    selectors: {
        [`&:hover`]: {
            backgroundColor: "#ebe9e9",
        }
    }
})
export const th = style({
    // padding: theme.spacing(12, 0),
    // paddingBottom: 12,
    padding: "12px 8px",
    textAlign: "left",
    fontWeight: 400,
})
export const td = style({
    padding: 8,
})

globalStyle(`${td}, ${th}`, {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ebe9e9"
})