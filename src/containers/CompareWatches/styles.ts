import { styled, Grid, Container as MuiContainer } from "@mui/material";

export const MainGrid = styled(Grid)(() => ({
  paddingLeft: "10px",
  paddingRight: "10px",
}));

interface ContainerProps {
  mobile: boolean;
}

export const Container = styled(MuiContainer) (({mobile}:ContainerProps)=>({
  marginTop: mobile ? "100px" : "140px" 
}))
