import { Button as MuiButton, styled } from "@mui/material";

export const Button = styled(MuiButton)(() => ({
  color: "#FFFFFF !important",
  border: "solid 2px !important",
  borderColor: "orange !important",
  fontSize: "13px !important",
  borderRadius: "20px !important",

  "&:hover": {
    color: "#FFA500 !important",
  },
  "&:active": {
    color: "#FFFFFF !important",
  },
}));
