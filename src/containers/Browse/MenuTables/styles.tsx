import { Box as MuiBox, styled } from "@mui/system";
import { Grid as MuiGrid } from "@mui/material";

export const Box = styled(MuiBox)(({ theme }) => ({
  background: theme.palette.box.primary,
  marginTop: "20vh",
}));

export const Grid = styled(MuiGrid)(() => ({
  paddingLeft: "20px",
  paddingRight: "20px",
}));
