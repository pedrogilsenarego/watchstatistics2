import { Grid as MuiGrid, styled, Typography } from "@mui/material";

interface GridProps {
  mobile: boolean;
}

export const Grid = styled(MuiGrid)(({ mobile }: GridProps) => ({
  paddingTop: "20px",
  paddingLeft: mobile ? "0px" : "20px",
  paddingRight: mobile ? "0px" : "20px",
}));

export const ButtonGrid = styled(MuiGrid)(() => ({
  paddingTop: "40px",
}));

export const NoMoreResultsTypography = styled(Typography)(() => ({
  fontSize: "22px",
  color: "white",
  marginTop: "70px",
}));

export const NoMoreResults2Typography = styled(Typography)(() => ({
  fontSize: "16px",
  color: "#ffffff66",
}));
