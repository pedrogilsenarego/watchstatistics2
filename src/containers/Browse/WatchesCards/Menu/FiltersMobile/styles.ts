import { Typography as MuiTypography, styled } from "@material-ui/core";

export const TypographyClearFilters = styled(MuiTypography)(() => ({
  color: "lightGrey",
  fontSize: "16px",
  cursor: "pointer",
}));

export const TypographyTitle = styled(MuiTypography)(() => ({
  color: "lightGrey",
  fontSize: "30px",
  fontWeight: 600,
}));
