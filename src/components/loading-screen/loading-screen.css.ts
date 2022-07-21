import {style} from "@vanilla-extract/css";

export const screen = style({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})