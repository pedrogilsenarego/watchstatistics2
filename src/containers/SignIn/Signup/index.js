import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUpUserStart } from "../../../redux/User/user.actions";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import TextField from "../../forms/InputMUI";
import CheckBox from "../../forms/checkBoxMUI";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button3Formik from "src/components/Buttons/Button3Formik";
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
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const INITIAL_FORM_STATE = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsOfService: false,
};

const FORM_VALIDATION = Yup.object().shape({
  displayName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must Match")
    .required("Required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  termsOfService: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted")
    .required("The terms and conditions must be accepted"),
});

const Signup = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [terms, setTerms] = useState(false);
  const { currentUser } = useSelector(mapState);

  useEffect(
    () => {
      if (currentUser) {
        history.goBack();
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  const handleFormSubmit = (event) => {
    const { displayName, email, password, confirmPassword } = event;
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
    return false;
  };

  return (
    <Grid item xs={12}>
      <div>
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
            <Grid container>
              <Grid item xs={12}>
                <Container
                  style={{
                    backgroundColor: "#ffffff",
                    height: "40px",
                    padding: "0px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <TextField
                    className={classes.textField}
                    name='displayName'
                    size='small'
                    placeholder='Full name'
                  ></TextField>
                </Container>
              </Grid>
              <Grid item xs={12}>
                <Container
                  style={{
                    backgroundColor: "#ffffff",
                    height: "40px",
                    padding: "0px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <TextField
                    className={classes.textField}
                    size='small'
                    name='email'
                    placeholder='Email'
                  ></TextField>
                </Container>
              </Grid>
              <Grid item xs={12}>
                <Container
                  style={{
                    backgroundColor: "#ffffff",
                    height: "40px",
                    padding: "0px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <TextField
                    className={classes.textField}
                    size='small'
                    type='password'
                    name='password'
                    placeholder='Password'
                  />
                </Container>
              </Grid>
              <Grid item xs={12}>
                <Container
                  style={{
                    backgroundColor: "#ffffff",
                    height: "40px",
                    padding: "0px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <TextField
                    className={classes.textField}
                    size='small'
                    type='password'
                    name='confirmPassword'
                    placeholder='ConfirmPassword'
                  />
                </Container>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "20px" }}>
                <Typography
                  onClick={() => {
                    setTerms(!terms);
                  }}
                  style={{ color: "#ffffffCC" }}
                >
                  Terms of service
                </Typography>
                {terms && (
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#ffffffCC",
                      wordWrap: "break-word",
                    }}
                  >
                    This is an app
                  </Typography>
                )}

                <CheckBox
                  style={{ color: "white" }}
                  name='termsOfService'
                  label='I, agree'
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "15px" }}>
                <Button3Formik title='Submit' />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </Grid>
  );
};

export default Signup;
