import { styled, Box as MuiBox } from "@mui/material";

export const Box = styled(MuiBox)(() => ({
  width: "100%",
  backgroundColor: "darkGreen",
  padding: "10px",
  borderRadius: "4px",
  border: "solid 2px",
  borderColor: "darkGreen",
  justifyContent: "center",
  alignItems: "center",
}));
