import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Button3Formik from "src/components/Buttons/Button3Formik";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextField from "../../forms/InputMUI";
import Alert from "src/components/Alert";
import { clearApiRequest } from "src/redux/general/general.actions";

import {
  resetPasswordStart,
  resetUserState,
} from "../../../redux/User/user.actions";

const INITIAL_FORM_STATE = {
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Must be a valid Email").required("Required"),
});
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
}));
const mapState = (state) => ({
  resetPasswordSuccess: state.user.resetPasswordSuccess,
  general: state.general,
});

const RecoverPwd = ({ handleCloseLoginMenu, mobile }) => {
  const { resetPasswordSuccess, general } = useSelector(mapState);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [triggerAlert, setTriggerAlert] = useState(false);

  useEffect(
    () => {
      if (resetPasswordSuccess) {
        dispatch(resetUserState());
        handleCloseLoginMenu();
      }
    },
    // eslint-disable-next-line
    [resetPasswordSuccess]
  );

  const handleSubmit = (e) => {
    const { email } = e;
    dispatch(resetPasswordStart({ email }));
    setTriggerAlert(true);
  };

  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Container
                style={{
                  backgroundColor: "#ffffff",
                  height: "40px",
                  padding: "0px",
                  marginTop: "10px",
                  borderRadius: "4px",
                  width: mobile ? "95vw" : "500px",
                }}
              >
                <TextField
                  className={classes.textField}
                  size='small'
                  name='email'
                  placeholder='Email'
                />
              </Container>
            </Grid>
            <Grid
              item
              xs={12}
              textAlign='center'
              style={{ paddingTop: "30px" }}
            >
              <Alert
                onClose={() => dispatch(clearApiRequest())}
                severity='error'
                maxWidth='500px'
                message={general.apiRequestMessage}
                trigger={triggerAlert}
                setTrigger={setTriggerAlert}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ paddingTop: mobile ? "30px" : "100px" }}
              textAlign='center'
            >
              <Button3Formik fullWidth title='Recover Password' />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default RecoverPwd;
