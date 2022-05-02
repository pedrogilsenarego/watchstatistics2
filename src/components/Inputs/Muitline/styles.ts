import { styled, TextField as MuiTextField } from "@mui/material";

export const TextField = styled(MuiTextField)(() => ({
  borderRadius: "4px",
  "& .MuiInputBase-input": {
    color: "whiteSmoke",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff66",
    },
    "&:hover fieldset": {
      borderColor: "orange",
    },
    "&.Mui-focused fieldset": {
      borderColor: "orange",
    },
  },
}));
