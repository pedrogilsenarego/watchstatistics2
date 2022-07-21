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

export const BoxList = styled(MuiBox)(() => ({
  backgroundColor: "lightgray",
  padding: "6px",
  borderRadius: "5px",
  cursor: "pointer",
}));

interface TypographyListProps {
  color?:string;
}

export const TypographyList = styled(MuiTypography)(({color}:TypographyListProps) => ({
  color: color || "#18161E",
  fontSize: "24px !important",
}));
