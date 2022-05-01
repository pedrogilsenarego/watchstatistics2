import { styled, TextField as MuiTextField } from "@mui/material";

export const TextField = styled(MuiTextField)(() => ({
  color: "white",
  "& label.Mui-focused": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff66",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
}));
