import {styled, Grid, Typography, Card} from "@mui/material"


export const DashedGrid = styled(Grid)(() => ({
  textAlign: "left",
  padding: "12px",
  border: "dashed 1px #ffffff1A",
  borderRadius: "6px",

}))



export const StyledCard = styled(Card) (()=>({
 backgroundColor: "#18161E !important",
 padding: "10px"
}))

// Typographies

export const StyledFormError = styled(Typography)(()=>({
  color: "red"
}))

export const StyledBasicTypography = styled(Typography)(()=>({
  color: "white",
  fontSize: "20px"
}))