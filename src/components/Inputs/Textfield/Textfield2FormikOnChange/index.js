import React from "react";
import { TextField, Container } from "@material-ui/core";
import { useField } from "formik";
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

const TextfieldFormik = ({
  name,
  placeholder,
  customOnChange,
  ...otherProps
}) => {
  const [field, mata] = useField(name);
  const classes = useStyles();

  const handleChange = (evt) => {
    const { value } = evt.target;
    customOnChange(value);
  };
  const configTextField = {
    ...field,
    ...otherProps,
    onChange: handleChange,
    fullWidth: true,
    variant: "outlined",
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
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
        {...configTextField}
        size='small'
        className={classes.textField}
        name={name}
        placeholder={placeholder}
      ></TextField>
    </Container>
  );
};

export default TextfieldFormik;
