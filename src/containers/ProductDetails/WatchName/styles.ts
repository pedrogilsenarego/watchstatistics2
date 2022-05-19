import {styled, Typography as MuiTypography, Grid} from "@mui/material"

export const Typography = styled(MuiTypography)(() => ({
  color: "#ffffff66",
  marginLeft: "10px !important",
}));

export const TypographyNewWatch = styled(MuiTypography)(() => ({
  color: "#ffffff66",
  cursor: "pointer"
}));

export const GridContainer = styled(Grid)(() => ({
  marginLeft: "10px", marginBottom: "5px" 
}));