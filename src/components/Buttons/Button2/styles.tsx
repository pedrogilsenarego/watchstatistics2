import { Button as MuiButton, styled } from "@mui/material";

export const Button = styled(MuiButton)(() => ({
  color: "#ffffff66 !important",
  border: "solid 2px !important",
  borderColor: "#ffffff66 !important",
  fontSize: "13px !important",
  borderRadius: "20px !important",

  "&:hover": {
    color: "white !important",
  },
  "&:active": {
    color: "#FFFFFF !important",
  },
}));
