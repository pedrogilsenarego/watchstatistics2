import {
  styled,
  Paper as MuiPaper,
  Box as MuiBox,
  Typography as MuiTypography,
} from "@mui/material";

export const Paper = styled(MuiPaper)(() => ({
  backgroundColor: "#18161E !important",
  color: "white !important",
  paddingTop: "10px",
  paddingBottom: "10px",
}));

export const FiltersBox = styled(MuiBox)(() => ({
  backgroundColor: "#18161E !important",
  color: "white !important",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "-10px !important",
}));

export const FiltersTypography = styled(MuiTypography)(() => ({
  fontSize: "16px",
}));
