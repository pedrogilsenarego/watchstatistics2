import {
  styled,
  Box as MuiBox,
  Typography as MuiTypography,
} from "@mui/material";

export const Box = styled(MuiBox)(() => ({
  backgroundColor: "lightgray",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
}));

export const Typography = styled(MuiTypography)(() => ({
  fontSize: "20px !important",
  color: "#18161E",
}));

interface BoxListProps {
  backgroundColor?:string | null;
}

export const BoxList = styled(MuiBox)(({backgroundColor}:BoxListProps) => ({
  backgroundColor: backgroundColor || "lightgray",
  padding: "6px",
  borderRadius: "5px",
  cursor: "pointer",
}));

interface TypographyListProps {
  color?:string;
  fontSize?:string;
}

export const TypographyList = styled(MuiTypography)(({color, fontSize}:TypographyListProps) => ({
  color: color || "#18161E",
  fontSize: fontSize|| "24px !important",
}));
