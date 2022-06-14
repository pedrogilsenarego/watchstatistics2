import {
  styled,
  Container as MuiContainer,
  Avatar as MuiAvatar,
  Typography,
  Box
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Rank } from "src/Utils/gamyfication";

export const Container = styled(MuiContainer)(() => ({
  marginTop: "80px",
  paddingTop: "10px",
  paddingBottom: "10px",
  background: "#154A6799",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

interface BorderLineProps {
  getRank: Rank;
}

export const BorderLinearProgress = styled(LinearProgress)(
  ({ getRank }: BorderLineProps) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "black",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: getRank?.color,
    },
  })
);

export const Avatar = styled(MuiAvatar)((mobile: boolean) => ({
  cursor: "pointer",
  width: mobile ? 90 : 74,
  height: mobile ? 90 : 74,
  float: mobile ? "none" : "right",
}));

export const AvatarTypography = styled(Typography)(() => ({
  fontSize: "60px",
  fontWeight: 500,
  color: "white",
  fontFamily: "Open Sans Condensed,sans-serif",
}))

export const PointsBox = styled(Box)(() => ({
  backgroundColor: "#2874A6",
  height: "100px",
  width: "150px",
  borderRadius: "20px",
  cursor: "pointer",
}))

export const InfoBox = styled(Box)(() => ({
  backgroundColor: "#2874A6",
  height: "100px",
  width: "250px",
  borderRadius: "20px",
  cursor: "pointer",
}))