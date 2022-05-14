import React, { useState } from "react";
import { MenuItem, TextField, Container } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-input": { color: "white" },

    "& .MuiInputLabel-root": { color: "grey" },
    "&:hover .MuiInputLabel-root": { color: "black" },
    "& .MuiInputLabel-root.Mui-focused": { color: "grey" },

    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderWidth: "2px",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black",
    },

    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
    "&  .MuiOutlinedInput-input": {
      color: "black",
    },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
  },
}));

const SelectWrapper = ({ name, options, myLabel, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [valueA, setValueA] = useState("");
  const classes = useStyles();

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
    <Container
      style={{
        backgroundColor: "white",
        height: "40px",
        padding: "0px",

        borderRadius: "4px",
      }}
    >
      <TextField
        className={classes.textField}
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
    </Container>
  );
};

export default SelectWrapper;
