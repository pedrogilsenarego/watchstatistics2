import { styled, Typography as MuiTypography } from "@mui/material";

export const Typography = styled(MuiTypography)(() => ({
  color: "orange",
  fontSize: "25px !important",
  fontWeight: "600 !important",
  cursor: "pointer",
}));

export const TypographyDisabled = styled(MuiTypography)(() => ({
  color: "grey",
  fontSize: "25px !important",
  fontWeight: "600 !important",
  cursor: "pointer",
}));

export const TypographyLogin = styled(MuiTypography)(() => ({
  color: "orange",
  fontSize: "16px !important",
  fontWeight: "600 !important",
  cursor: "pointer",
}));
