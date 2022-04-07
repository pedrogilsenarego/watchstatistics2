import React from "react";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../../redux/User/user.actions";
import * as Yup from "yup";
import { Grid, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import TextField from "../../forms/InputMUI";
import ButtonMUI from "../../forms/ButtonMUI";
import Container from "@mui/material/Container";
import { makeStyles } from "@material-ui/core/styles";

import { FcGoogle } from "react-icons/fc";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-input": { color: "white" },
    "& . MuiInputLabel-root": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root": { color: "grey" },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderWidth: "2px",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black",
    },
    "&:hover .MuiInputLabel-root": { color: "grey" },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
    "&  .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ffffffB3" },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
  },

  textBtn: {
    color: "#FFFFFF",
    fontSize: "13px",
    backgroundColor: "#00000066",
    border: "solid 2px",
    borderColor: "orange",
    borderRadius: "14px",
    "&:hover": {
      color: "#FFA500",
      backgroundColor: "#ffffff00",
    },
    "&:active": {
      color: "#FFFFFF",
    },
  },
}));

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Main = ({ handleCloseLoginMenu }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleFormSubmit = (event) => {
    const { email, password } = event;
    dispatch(
      emailSignInStart({
        email,
        password,
      })
    );
    handleCloseLoginMenu();
    return false;
  };

  const handleGoogleSigniIn = () => {
    dispatch(googleSignInStart());
    handleCloseLoginMenu();
  };

  return (
    <div>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            handleFormSubmit(values);
          }}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Container
                  style={{
                    backgroundColor: "white",
                    height: "40px",
                    padding: "0px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <TextField
                    className={classes.textField}
                    name="email"
                    size="small"
                    placeholder="Email"
                  ></TextField>
                </Container>
              </Grid>

              <Grid item xs={12}>
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
                    type="password"
                    name="password"
                    size="small"
                    placeholder="Password"
                  ></TextField>
                </Container>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "10px" }}>
                <ButtonMUI className={classes.textBtn}>Login</ButtonMUI>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
      <Grid item xs={12} style={{ paddingTop: "30px" }}>
        <Button
          onClick={handleGoogleSigniIn}
          variant={"contained"}
          fullWidth={true}
          style={{ backgroundColor: "#4285F4", color: "#FFFFFF" }}
        >
          <FcGoogle size={"2em"} /> &nbsp;Login With Google
        </Button>
      </Grid>
    </div>
  );
};

export default Main;
