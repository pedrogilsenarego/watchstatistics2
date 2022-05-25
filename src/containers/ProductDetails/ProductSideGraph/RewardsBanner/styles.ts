
import { styled, Grid, Typography } from "@mui/material"

export const MainBox = styled(Grid)(() => ({
  textAlign: "left",
  padding: "12px",
  
  border: "dashed 1px #ffffff1A",
  borderRadius: "6px",

}))

export const MainTypography = styled(Typography)(() => ({
  color: "#ffffffBF", fontSize: "13px !important"
}))

export const SecondaryTypography = styled(Typography)(() => ({
  color: "orange", fontSize: "13px !important"
}))
