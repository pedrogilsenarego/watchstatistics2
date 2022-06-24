import {styled, Button as MuiButton} from "@mui/material"

interface Props {
  disabled?: boolean;
}

export const Button= styled(MuiButton) (({disabled}:Props)=>({
  color: disabled ? "#ffffff66 !important" : "orange !important",
  border: disabled? "solid 2px #ffffff66 !important" : "solid 2px orange !important"
}))