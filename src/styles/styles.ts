import {styled, Grid, Typography} from "@mui/material"


export const DashedGrid = styled(Grid)(() => ({
  textAlign: "left",
  padding: "12px",
  border: "dashed 1px #ffffff1A",
  borderRadius: "6px",

}))

export const StyledFormError = styled(Typography)(()=>({
  color: "red"
}))