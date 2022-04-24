import { styled, Box as MuiBox } from "@mui/material";

interface Props {
  bgColor: string;
}

export const Box = styled(MuiBox)(({ bgColor }: Props) => ({
  width: "100%",
  backgroundColor: bgColor ? bgColor : "darkGreen",
  padding: "10px",
  borderRadius: "4px",
  border: "solid 2px",
  borderColor: "darkGreen",
  justifyContent: "center",
  alignItems: "center",
}));
