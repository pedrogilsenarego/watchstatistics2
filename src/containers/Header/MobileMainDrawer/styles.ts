import { Typography as MuiTypography, styled, Grid } from "@material-ui/core";

export const TypographyClearFilters = styled(MuiTypography)(() => ({
  color: "lightGrey",
  fontSize: "16px",
  cursor: "pointer",
}));

export const TypographyTitle = styled(MuiTypography)(() => ({
  color: "lightGrey",
  fontSize: "35px",
  fontWeight: 600,
}));

export const CategoriesGrid = styled(Grid)(() => ({
  marginTop: "20px",
}));
