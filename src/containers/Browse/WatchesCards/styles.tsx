import { Grid as MuiGrid, styled } from "@mui/material";

interface GridProps {
  mobile: boolean;
}

export const Grid = styled(MuiGrid)(({ mobile }: GridProps) => ({
  paddingTop: "20px",
  paddingLeft: mobile ? "8px" : "20px",
  paddingRight: mobile ? "8px" : "20px",
}));

export const ButtonGrid = styled(MuiGrid)(() => ({
  paddingTop: "40px",
}));
