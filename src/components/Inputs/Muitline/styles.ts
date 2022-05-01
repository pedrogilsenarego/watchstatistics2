import { styled, TextField as MuiTextField } from "@mui/material";

export const TextField = styled(MuiTextField)(() => ({
  backgroundColor: "white",
  borderRadius: "4px",

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
