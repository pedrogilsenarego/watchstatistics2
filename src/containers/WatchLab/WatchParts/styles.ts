
import { styled, Paper as MuiPaper, Box } from "@mui/material";

export const Paper = styled(MuiPaper)(() => ({
  
  padding: "15px",
  backgroundColor: "#3C393900 !important",
}));

export const PartsBox = styled(Box)(() => ({
  backgroundColor: "#00000066",
  marginTop: "2px",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  minHeight: "80px",
}));
