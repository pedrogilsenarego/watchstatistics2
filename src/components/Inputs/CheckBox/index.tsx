import { useState } from "react";
import { Checkbox, Typography, Grid } from "@mui/material";

interface Props {
  color?: string;
  label: string;
  handleChange: () => void;
}

const CheckBox = ({ label, color, handleChange }: Props) => {
  const [checked, setChecked] = useState(false);
  return (
    <Grid
      container
      justifyContent='end'
      columnGap={1}
      onClick={() => {
        handleChange();
        setChecked(!checked);
      }}
    >
      <Grid item>
        <Typography style={{ color: color || "white", cursor: "pointer" }}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Checkbox
          checked={checked}
          style={{ color: color || "red" }}
          sx={{

            "&.Mui-checked": {
              color: color || "red",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CheckBox;
