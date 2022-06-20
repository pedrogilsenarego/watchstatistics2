import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled, Paper as MuiPaper, Box } from "@mui/material";

interface Props {
  backColor: string;
  barColor: string;
}

export const BorderLinearProgress = styled(LinearProgress)(
  ({ backColor, barColor }: Props) => ({
    height: 20,
    width: 100,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: backColor,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barColor,
    },
  })
);

export const Paper = styled(MuiPaper)(() => ({
  marginRight: "20px",
  padding: "15px",
  backgroundColor: "#3C393900 !important",
}));

export const PartsBox = styled(Box)(() => ({
  backgroundColor: "#00000066",
  marginTop: "5px",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  minHeight: "50px",
}));
