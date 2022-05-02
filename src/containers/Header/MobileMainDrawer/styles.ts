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

export const TypographySmaller = styled(MuiTypography)(() => ({
  color: "#ffffff66 !important",
  fontSize: "16px !important",
}));

export const Divider = styled(MuiDivider)(() => ({
  width: "50%",
  height: "2px",
  backgroundColor: "lightGrey !important",
  marginTop: "15px !important",
  marginBottom: "15px !important",
  borderRadius: "2px",
}));

export const DividerSmall = styled(MuiDivider)(() => ({
  width: "100%",
  height: "1px",
  backgroundColor: "#ffffff66 !important",
  marginTop: "280px !important",

  borderRadius: "2px",
}));
