import React, { useState } from "react";
import { Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import Divider from "@mui/material/Divider";
import Main from "./Main";
import RecoverPwd from "./RecoverPwd";
import Signup from "./Signup";
import TopHeader from "src/components/TopHeader";
import { menuButtons } from "./constants";

interface Props {
  handleCloseLoginMenu: () => void
}

const SignIn = ({ handleCloseLoginMenu }: Props) => {
  const [whichMenu, setWhichMenu] = useState("main");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const configMain = {
    handleCloseLoginMenu,
    mobile
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
      {mobile && (
        <TopHeader
          marginTop='50px'
          listButtons={menuButtons(setWhichMenu)}
          justifyContent='center'
        />
      )}
      <Grid
        container
        xs={12}
        justifyContent='center'
        alignItems='center'
        style={{ marginTop: mobile ? "20px" : "20vh" }}
      >
        {whichMenu === "main" && <Main {...configMain} />}
        {whichMenu === "recover" && <RecoverPwd {...configMain} />}
        {whichMenu === "register" && <Signup {...configMain} />}
      </Grid>
      {!mobile && (
        <div
          style={{
            position: "absolute",
            bottom: "3vh",
            width: "100%",
          }}
        >
          <Divider
            style={{
              width: "100%",
              background: "white",
            }}
          />
          <Grid
            style={{ marginTop: "10px" }}
            container
            alignItems='center'
            justifyContent='center'
            columnGap={2}
          >
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
        </div>
      )}
    </Grid>
  );
};

export default SignIn;
