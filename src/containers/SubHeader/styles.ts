import {styled, Container as MuiContainer} from "@mui/material"
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {Rank} from "src/Utils/gamyfication"

export const Container = styled(MuiContainer)(()=>({
  marginTop: "80px",
      paddingTop: "10px",
      paddingBottom: "10px",
      background: "#154A6799",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
}))

interface BorderLineProps {
  getRank: Rank;
}

export const BorderLinearProgress = styled(LinearProgress)(({ getRank }: BorderLineProps) => ({
  height: 4,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "black",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: getRank?.color,
  },
}));