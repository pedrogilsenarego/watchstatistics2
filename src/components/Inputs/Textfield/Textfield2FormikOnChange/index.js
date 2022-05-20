import { useEffect } from "react";
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
  show,
  setShow,
  ...otherProps
}) => {
  const [field, mata, helpers] = useField(name);
  const classes = useStyles();

  const handleChange = (evt) => {
    const { value } = evt.target;
    helpers.setValue(value);
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

  useEffect(() => {
    if (mata.touched) {
      setShow(false);
      helpers.setTouched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mata.touched]);

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
