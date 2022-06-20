import { styled, Paper as MuiPaper } from "@mui/material";

export const Paper = styled(MuiPaper)(() => ({
  background: "#0000001C !important",
  position: "fixed",
  zIndex: "1000",
  marginTop: "91vh",
  padding: "10px",
  width: "680px",
  color: "#ffffffBE !important",
  left: 0,
  right: 0,
  marginLeft: "auto",
  marginRight: "auto",
}));
