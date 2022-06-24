import { useState } from "react";
import { Checkbox, Grid } from "@mui/material";
import * as GeneralStyled from "src/styles/styles"

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
        <GeneralStyled.BasicTypography style={{ cursor: "pointer" }}>
          {label}
        </GeneralStyled.BasicTypography>
      </Grid>
      <Grid item>
        <Checkbox
          checked={checked}
          style={{ color: "#ffffffCE" }}
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
