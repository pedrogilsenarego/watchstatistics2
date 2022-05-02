import {
  Typography as MuiTypography,
  styled,
  Divider as MuiDivider,
} from "@mui/material";

export const TypographyTitle = styled(MuiTypography)(() => ({
  color: "lightGrey !important",
  fontSize: "30px !important",
  fontWeight: "600 !important",
}));

export const TypographyLanguage = styled(MuiTypography)(() => ({
  color: "lightGrey !important",
  fontSize: "20px !important",
  fontWeight: "600 !important",
}));

export const Divider = styled(MuiDivider)(() => ({
  width: "50%",
  height: "3px",
  backgroundColor: "lightGrey !important",
  marginTop: "15px !important",
  marginBottom: "15px !important",
  borderRadius: "2px",
}));
