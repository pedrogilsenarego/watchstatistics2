import { Form, Formik } from "formik";
import { Grid } from "@mui/material";
import TextField from "../../forms/InputMUI";
import CheckBox from "../../forms/checkBoxMUI";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { clearApiRequest } from "src/redux/general/general.actions";
import Alert from "src/components/Alert";
import Button3Formik from "src/components/Buttons/Button3Formik";
import { FORM_VALIDATION } from "./validation";
import useSignup from "./useSignup";

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
                  style={{ color: "white !important" }}
                  name='termsOfService'
                  label='I, agree'
                />
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
  );
};

export default Signup;
