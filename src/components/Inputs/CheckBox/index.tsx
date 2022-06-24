import { useState, useEffect } from "react";
import { Checkbox, Grid } from "@mui/material";
import * as GeneralStyled from "src/styles/styles"

interface Props {
  color?: string;
  label: string;
  handleChange: () => void;
  customChecked?: boolean;
}

const CheckBox = ({ label, color, handleChange, customChecked }: Props) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (customChecked === false) setChecked(false)
  }, [customChecked])

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
