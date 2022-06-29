import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useField, useFormikContext } from "formik";
import * as GeneralStyled from "src/styles/styles";

const CheckboxWrapper = ({ name, label, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component='legend'>{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <>
              <GeneralStyled.BasicTypography style={{ cursor: "pointer" }}>
                {label}
              </GeneralStyled.BasicTypography>
              <Checkbox
                style={{ color: "#ffffffCE" }}
                sx={{
                  color: "#ffffffB3 !important",
                  "&.Mui-checked": {
                    color: "white !important",
                  },
                }}
                {...configCheckbox}
              />
            </>
          }
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
