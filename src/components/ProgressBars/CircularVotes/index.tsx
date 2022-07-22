import {
  CircularProgress as MuiCircularProgress,
  Box,
  Typography,
} from "@mui/material";

interface Props {
  hideAvgTotal?: boolean;
  avgTotal: number;
  customSize?: number;
  customFontSize?: string;
  color?: string;
  secondColor?: string;
  thickness?: number;
}

const CircularVotes = ({ avgTotal, customSize, customFontSize, color, secondColor, hideAvgTotal, thickness }: Props) => {
  return (
    <Box
      component='div'
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MuiCircularProgress
        variant='determinate'
        value={avgTotal * 10}
        size={customSize ? customSize : 80}
        style={{ color: color || "orange", position: "relative", zIndex: 2 }}
        thickness={thickness || 4}
      />
      <MuiCircularProgress
        variant='determinate'
        value={100}
        size={customSize ? customSize : 80}
        style={{ color: secondColor || "black", position: "absolute", zIndex: 1 }}
        thickness={thickness || 4}
      />
      <Box
        component='div'
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!hideAvgTotal && (<Typography
          variant='caption'
          component='div'
          color='white'
          style={{ fontSize: customFontSize ?? "16px" }}
        >
          {avgTotal}
        </Typography>)}

      </Box>
    </Box>
  );
};

export default CircularVotes;
