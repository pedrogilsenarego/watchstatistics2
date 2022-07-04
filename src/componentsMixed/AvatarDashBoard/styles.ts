import {styled, Stack as MuiStacked} from "@mui/material"

interface PropsStack {
  mobile:boolean;
}
export const Stack = styled(MuiStacked)(({mobile}:PropsStack)=>({
  display: "flex",
        flexDirection: "row",
        backgroundColor: "#ffffff1A",
        borderRadius: "24px",
        alignItems: "center",
        justifyContent: "flex-end",
}))