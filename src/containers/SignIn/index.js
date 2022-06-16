import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
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
        <RiCloseFill
          onClick={handleCloseLoginMenu}
          size='2.5em'
          color='lightGrey'
          style={{ cursor: "pointer" }}
        />
      </Grid>
      <Grid
        container
        xs={12}
        justifyContent='center'
        alignItems='center'
        style={{ marginTop: "20vh" }}
      >
        {whichMenu === "main" && <Main {...configMain} />}
        {whichMenu === "recover" && <RecoverPwd {...configMain} />}
        {whichMenu === "register" && <Signup {...configMain} />}
      </Grid>
      <Divider
        style={{
          width: "100%",
          background: "white",
          marginTop: "20vh",
        }}
      />
      <Grid container alignItems='center' justifyContent='center' columnGap={2}>
        <Typography
          style={{
            fontSize: "13px",
            color: whichMenu === "main" ? "white" : "#ffffff80",
            paddingTop: "5px",
            cursor: "pointer",
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
            cursor: "pointer",
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
            cursor: "pointer",
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
