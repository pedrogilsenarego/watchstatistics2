import {styled, Stack as MuiStacked} from "@mui/material"

interface PropsStack {
  mobile:boolean;
}
export const Stack = styled(MuiStacked)(({mobile}:PropsStack)=>({
  display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: mobile ? "5vh" : "6.5vh",
        justifyContent: "flex-end",
}))