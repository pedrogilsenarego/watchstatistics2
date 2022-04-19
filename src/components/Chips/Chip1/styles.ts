import { styled, Box } from "@mui/material";

interface buttonProps {
  bColor?: string;
}

export const Chip = styled(Box)(({ bColor }: buttonProps) => ({
  backgroundColor: bColor ? bColor : "#18161E",
  textTransform: "none",
  borderRadius: "16px ",
  fontSize: "14px",
  color: "#ffffff66",
  padding: "4px 8px 4px 8px",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
}));
