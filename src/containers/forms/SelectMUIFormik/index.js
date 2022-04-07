import React, { useState } from "react";
import {MenuItem} from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";

const SelectWrapper = ({ name, options, myLabel, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [valueA, setValueA] = useState("");

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
    setValueA("a");
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,

    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField
      {...configSelect}
      label={valueA === "" ? myLabel : ""}
      InputLabelProps={{ shrink: false }}
    >
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
