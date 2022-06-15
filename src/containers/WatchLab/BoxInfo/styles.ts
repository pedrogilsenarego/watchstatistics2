import {
  styled,
  Paper as MuiPaper,
  Divider as MuiDivider,
} from "@mui/material";

export const Paper = styled(MuiPaper)(() => ({
  background: "#0000001C !important",
  width: "350px",
  padding: "20px",
}));

export const Divider = styled(MuiDivider)(() => ({
  width: "100%",
  marginTop: "3px",
  background: "#ffffff66",
}));
