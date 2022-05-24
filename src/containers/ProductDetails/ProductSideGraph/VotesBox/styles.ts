
import { styled, Grid, Typography } from "@mui/material"

interface MainBoxProps {
  mobile: boolean;
}
export const MainBox = styled(Grid)(({mobile}:MainBoxProps) => ({
  textAlign: mobile ? "center" : "left",
  padding: "15px",
  
  border: "dashed 1px #ffffff1A",
  borderRadius: "6px",

}))

export const MainTypography = styled(Typography) (()=>({
  color: "#ffffffBF", fontSize: "13px !important"
}))

export const SecondaryTypography = styled(Typography) (()=>({
  color: "#ffffffBF", fontSize: "13px !important"
}))