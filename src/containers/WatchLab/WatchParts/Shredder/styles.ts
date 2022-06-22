import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material";

interface Props {
  backColor?: string;
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


