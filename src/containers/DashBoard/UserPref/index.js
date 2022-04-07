import { Typography } from "@material-ui/core";
import React from "react";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import TextField from "../../forms/InputMUI";
import ButtonMUI from "../../forms/ButtonMUI";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { updateUserPreferences } from "../../../redux/User/user.actions";
import { useTheme } from "@material-ui/core";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
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

const UserPref = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const theme = useTheme();
  const classes = useStyles();

  const handleChangeUserName = (values) => {
    const { username } = values;
    const configData = {
      ...currentUser,
      userID: currentUser.id,
      displayName: username,
      flag: "username",
    };
    dispatch(updateUserPreferences(configData));
  };

  return (
    <Container>
      <Typography style={{ paddingTop: "20px" }}>Username</Typography>
      <Typography style={{ color: theme.palette.text.faded }}>
        Your current username is {currentUser.displayName}, You can change for a
        different name, however the watches submited will keep the old name.
      </Typography>
      <Divider
        style={{
          width: "100%",
          background: theme.palette.text.faded3,
          marginTop: "20px",
        }}
      />

      <Typography
        style={{ color: theme.palette.text.faded, marginTop: "60px" }}
      >
        New username
      </Typography>
      <Formik
        initialValues={{
          username: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Required"),
        })}
        onSubmit={(values) => {
          handleChangeUserName(values);
        }}
      >
        <Form>
          <Container
            style={{
              backgroundColor: theme.palette.textField.background,
              height: "40px",
              padding: "0px",
              marginTop: "10px",
              borderRadius: "4px",
            }}
          >
            <TextField
              className={classes.textField}
              size="small"
              name="username"
              placeholder={currentUser.displayName}
              style={{ marginTop: "0px" }}
            ></TextField>
          </Container>
          <ButtonMUI style={{ marginTop: "20px" }}>Submit</ButtonMUI>
        </Form>
      </Formik>
    </Container>
  );
};

export default UserPref;
