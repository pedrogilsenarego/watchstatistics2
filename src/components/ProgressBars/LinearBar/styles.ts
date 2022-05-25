import {styled} from "@mui/material"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "lightGrey",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "onix",
  },
}));