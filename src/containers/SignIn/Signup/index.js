import { Form, Formik } from "formik";
import { Grid } from "@mui/material";
import TextField from "../../forms/InputMUI";
import CheckBox from "../../forms/checkBoxMUI";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import { clearApiRequest } from "src/redux/general/general.actions";
import Alert from "src/components/Alert";
import Button3Formik from "src/components/Buttons/Button3Formik";
import { FORM_VALIDATION } from "./validation";
import useSignup from "./useSignup";
import * as GeneralStyled from "src/styles/styles";
import TermsPopup from "./TermsPopup";

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
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsOfService: false,
};

const Signup = (props) => {
  const {
    handleFormSubmit,
    mobile,
    setTerms,
    terms,
    dispatch,
    general,
    triggerAlert,
    setTriggerAlert,
  } = useSignup();
  const classes = useStyles();

  return (
    <>
      <TermsPopup open={terms} setOpen={setTerms} />
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
                      width: "500px",
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
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: mobile ? "20px" : "20px" }}
                >
                  <Container
                    style={{
                      backgroundColor: "#ffffff",
                      height: "40px",
                      padding: "0px",
                      marginTop: "10px",
                      borderRadius: "4px",
                      width: "500px",
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
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: mobile ? "20px" : "20px" }}
                >
                  <Container
                    style={{
                      backgroundColor: "#ffffff",
                      height: "40px",
                      padding: "0px",
                      marginTop: "10px",
                      borderRadius: "4px",
                      width: "500px",
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
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: mobile ? "20px" : "20px" }}
                >
                  <Container
                    style={{
                      backgroundColor: "#ffffff",
                      height: "40px",
                      padding: "0px",
                      marginTop: "10px",
                      borderRadius: "4px",
                      width: "500px",
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
                <Grid
                  item
                  textAlign='center'
                  xs={12}
                  style={{ paddingTop: "20px" }}
                >
                  <GeneralStyled.BasicTypography
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      setTerms(!terms);
                    }}
                  >
                    Terms of service
                  </GeneralStyled.BasicTypography>

                  <CheckBox
                    style={{ color: "white !important" }}
                    name='termsOfService'
                    label='I, read and agree with the terms presented&nbsp; '
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: "10px", backgroundColor: "blue" }}
                >
                  <Alert
                    onClose={() => dispatch(clearApiRequest())}
                    severity='error'
                    maxWidth='500px'
                    message={general?.apiRequestMessage}
                    trigger={triggerAlert}
                    setTrigger={setTriggerAlert}
                  />
                </Grid>
                <Grid
                  item
                  textAlign='center'
                  xs={12}
                  style={{ paddingTop: "15px" }}
                >
                  <Button3Formik title='Submit' />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Grid>
    </>
  );
};

export default Signup;
