import { Paper as MuiPaper, styled, Box as MuiButton } from "@mui/material";

export const Paper = styled(MuiPaper)(() => ({
  alignItems: "center",
  backgroundColor: "#18161E !important",
  color: "white !important",
  padding: "5px",
}));

export const PaperMobile = styled(MuiPaper)(() => ({
  alignItems: "center",
  backgroundColor: "#18161E !important",
  color: "white !important",
  padding: "8px",
}));

interface buttonProps {
  bColor?: string;
}

export const Button = styled(MuiButton)(({ bColor }: buttonProps) => ({
  backgroundColor: bColor ? bColor : "#65656566 !important",
  textTransform: "none",
  borderRadius: "16px !important",
  color: "white !important",
  padding: "8px 15px 8px 15px",
}));

export const ButtonMobile = styled(MuiButton)(({ bColor }: buttonProps) => ({
  backgroundColor: bColor ? bColor : "#65656566 !important",
  textTransform: "none",
  borderRadius: "16px !important",
  color: "white !important",
  padding: "4px 10px 4px 10px",
}));
