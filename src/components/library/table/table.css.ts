import {style} from "@vanilla-extract/css";

export const table = style({
    width: "100%",
    textAlign: "left"
})

export const tableHead = style({
    textAlign: "left",
    textTransform: "capitalize",
    fontWeight: "bold",
    borderBottom: "1px solid red",
    padding: "0.5rem 0"
})

export const tableRow = style({})
export const tableCell = style({
    padding: "0 1rem"
})