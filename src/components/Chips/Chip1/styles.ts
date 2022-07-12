import { styled, Box } from "@mui/material";

interface buttonProps {
  bColor?: string;
  color?:string;
}

export const Chip = styled(Box)(({ bColor,color }: buttonProps) => ({
  backgroundColor: bColor || "#18161E",
  textTransform: "none",
  borderRadius: "16px ",
  fontSize: "14px",
  color: color || "#ffffff66",
  padding: "4px 8px 4px 8px",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
}));
