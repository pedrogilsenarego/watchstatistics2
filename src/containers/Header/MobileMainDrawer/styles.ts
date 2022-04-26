import {
  Typography as MuiTypography,
  styled,
  Divider as MuiDivider,
} from "@mui/material";

export const TypographyTitle = styled(MuiTypography)(() => ({
  color: "lightGrey !important",
  fontSize: "35px !important",
  fontWeight: "600 !important",
}));

export const Divider = styled(MuiDivider)(() => ({
  width: "100%",
  height: "3px",
  backgroundColor: "lightGrey",
  marginTop: "5px",
  borderRadius: "2px",
}));
