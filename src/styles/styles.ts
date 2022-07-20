import { styled, Grid, Typography, Card as MuiCard } from "@mui/material"

interface Props {
  disableBorder?: boolean;
}

export const DashedGrid = styled(Grid)(({ disableBorder }: Props) => ({
  textAlign: "left",
  padding: "12px",
  border: disableBorder ? "solid 0px" : "dashed 1px #ffffff1A",
  borderRadius: "6px",

}))

interface PropsCard {
  specialborder?: string;
}

export const Card = styled(MuiCard)(({ specialborder }: PropsCard) => ({
  border: "solid 2px !important",
  backgroundColor: "#18161E !important",
  borderImage: specialborder==="special" ? "linear-gradient(45deg, rgb(0,143,104), rgb(250,224,66)) 1 !important" : "default",
  padding: "10px",
  borderRadius: "4px !important"
}))

// Typographies

export const StyledFormError = styled(Typography)(() => ({
  color: "red"
}))

interface BasicTypographyProps {
  fontSize?: string;
  fontWeight?: number;
  fontFamily?: string;
  color?: string;
}

export const BasicTypography = styled(Typography)(({ fontSize, fontWeight, fontFamily, color }: BasicTypographyProps) => ({
  color: color || "#ffffffCE !important",
  fontSize: fontSize ?? "20px !important",
  fontWeight: fontWeight || 500,
  fontFamily: fontFamily ?? "inherit"
}))

export const TitleTypography = styled(Typography)(({ fontSize, fontWeight, fontFamily, color }: BasicTypographyProps) => ({
  color: color || "#ffffffCE",
  fontSize: fontSize ?? "24px !important",
  fontWeight: fontWeight || "bold !important",
  fontFamily: fontFamily ?? "inherit"
}))
