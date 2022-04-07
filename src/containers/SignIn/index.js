import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";

import Divider from "@mui/material/Divider";

import { useTheme } from "@material-ui/core";

import Main from "./Main";
import RecoverPwd from "./RecoverPwd";
import Signup from "./Signup";

const SignIn = ({ handleCloseLoginMenu }) => {
  const theme = useTheme();
  const [whichMenu, setWhichMenu] = useState("main");

  const configMain = {
    handleCloseLoginMenu,
  };

  return (
    <div>
      {whichMenu === "main" && <Main {...configMain} />}
      {whichMenu === "recover" && <RecoverPwd {...configMain} />}
      {whichMenu === "register" && <Signup {...configMain} />}
      <Divider
        style={{
          width: "100%",
          background: theme.palette.text.faded3,
          marginTop: "20px",
        }}
      />
      <Grid
        item
        container
        spacing={2}
        xs={12}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item textAlign="center">
          <Typography
            style={{
              fontSize: "13px",
              color: whichMenu === "main" ? "white" : "#ffffff80",
              paddingTop: "5px",
            }}
            onClick={() => {
              setWhichMenu("main");
            }}
          >
            Login
          </Typography>
        </Grid>
        <Grid item textAlign="center">
          <Typography
            style={{
              fontSize: "13px",
              color: whichMenu === "register" ? "white" : "#ffffff80",
              paddingTop: "5px",
              paddingLeft: "15px",
            }}
            onClick={() => {
              setWhichMenu("register");
            }}
          >
            Register
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: "13px",
              color: whichMenu === "recover" ? "white" : "#ffffff80",
              paddingTop: "5px",

              paddingLeft: "15px",
            }}
            onClick={() => {
              setWhichMenu("recover");
            }}
          >
            Reset Password
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
