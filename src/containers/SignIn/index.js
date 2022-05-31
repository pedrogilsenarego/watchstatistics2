import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";

import Divider from "@mui/material/Divider";
import Main from "./Main";
import RecoverPwd from "./RecoverPwd";
import Signup from "./Signup";

const SignIn = ({ handleCloseLoginMenu }) => {
  const [whichMenu, setWhichMenu] = useState("main");

  const configMain = {
    handleCloseLoginMenu,
  };

  return (
    <Grid container>
      <Grid item>
        {whichMenu === "main" && <Main {...configMain} />}
        {whichMenu === "recover" && <RecoverPwd {...configMain} />}
        {whichMenu === "register" && <Signup {...configMain} />}
      </Grid>
      <Divider
        style={{
          width: "100%",
          background: "white",
          marginTop: "20px",
        }}
      />
      <Grid container alignItems='center' justifyContent='center' columnGap={1}>
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

        <Typography
          style={{
            fontSize: "13px",
            color: whichMenu === "register" ? "white" : "#ffffff80",
            paddingTop: "5px",
          }}
          onClick={() => {
            setWhichMenu("register");
          }}
        >
          Register
        </Typography>

        <Typography
          style={{
            fontSize: "13px",
            color: whichMenu === "recover" ? "white" : "#ffffff80",
            paddingTop: "5px",
          }}
          onClick={() => {
            setWhichMenu("recover");
          }}
        >
          Reset Password
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SignIn;
