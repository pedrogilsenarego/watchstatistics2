import {
  CircularProgress as MuiCircularProgress,
  Box,
  Typography,
} from "@mui/material";

const CircularProgress = ({ avgTotal }: any) => {
  return (
    <Box component="div" sx={{ position: "relative", display: "inline-flex", alignItems: "center",
    justifyContent: "center",  }}>
      <MuiCircularProgress
        variant="determinate"
        value={avgTotal * 10}
        
        size={80}
        style={{ color: "orange", position: "relative", zIndex: 2 }}
      />
      <MuiCircularProgress
        variant="determinate"
        value={100}
        
        size={80}
        style={{ color: "black", position: "absolute", zIndex:1 }}
      />
      <Box
        component="div"
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
        <Typography
          variant="caption"
          component="div"
          color="white"
          style={{ fontSize: "16px" }}
        >
          {avgTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgress;
