import {
  styled,
  Box as MuiBox,
  Typography as MuiTypography,
} from "@mui/material";

export const Box = styled(MuiBox)(() => ({
  backgroundColor: "lightgray",
  padding: "10px",
  borderRadius: "5px",
}));

export const Typography = styled(MuiTypography)(() => ({
  fontSize: "20px !important",
  color: "#18161E",
}));
