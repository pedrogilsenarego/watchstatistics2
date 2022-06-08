import {styled, Grid, Typography, Card as MuiCard} from "@mui/material"

interface Props {
  disableBorder?: boolean;
}

export const DashedGrid = styled(Grid)(({disableBorder}:Props) => ({
  textAlign: "left",
  padding: "12px",
  border: disableBorder ? "solid 0px" : "dashed 1px #ffffff1A",
  borderRadius: "6px",

}))



export const Card = styled(MuiCard) (()=>({
 backgroundColor: "#18161E !important",
 padding: "10px"
}))

// Typographies

export const StyledFormError = styled(Typography)(()=>({
  color: "red"
}))

interface BasicTypographyProps {
  fontSize?:string;
}

export const BasicTypography = styled(Typography)(({fontSize}: BasicTypographyProps)=>({
  color: "#ffffffCE",
  fontSize: fontSize??"20px"
}))