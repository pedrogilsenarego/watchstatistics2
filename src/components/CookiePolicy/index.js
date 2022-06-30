import React, { useState, useEffect } from "react";
import { Typography, Button, ButtonGroup, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { acceptCookiePolicy } from "../../redux/User/user.actions";
import Popup from "../Popup";

const mapState = ({ user }) => ({
  user: user,
});

const CookiePolicy = () => {
  const [open, setOpen] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(mapState);

  useEffect(
    () => {
      if (user.cookiePolicy === true) setOpen(false);
      else setOpen(true);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Popup
      title='This Website uses Cookies'
      openPopup={open}
      setOpenPopup={setOpen}
    >
      <Grid container justifyContent='center'>
        <Typography style={{ color: "white" }}>
          The use of cookies on this website has only the finality of improving
          the user experience.
        </Typography>
        <Grid item xs={12}>
          <Typography style={{ color: "white", marginTop: "20px" }}>
            If you want to know more read our{" "}
            <b
              onClick={() => setPrivacyPolicy(!privacyPolicy)}
              style={{ cursor: "pointer", color: "orange" }}
            >
              Privacy policy
            </b>
          </Typography>
        </Grid>
        {privacyPolicy && (
          <Typography
            style={{
              color: "white",
              marginTop: "20px",
              fontSize: "13px",
            }}
          >
            This website stores some user preferences that are stored on the
            cache from the browser, the goal is strictly for better user
            experience.
            <br />
            <br />
            When registering the website, additional information is also stored,
            the information is not shared with any other entities and is safely
            secured with encryptation. The goal of that information is strictly
            for user experience.
            <br />
            <br />
            All passwords are never saved on the Database and instead are runed
            through a authentication process from google firebase.
            <br />
            <br />
            For more information please visit the <b>Submit Feedback</b> tab.
          </Typography>
        )}
        <ButtonGroup>
          <Button
            onClick={() => {
              dispatch(acceptCookiePolicy(true));
              setOpen(false);
            }}
            style={{
              float: "right",
              fontSize: "17px",
              color: "white",
              fontWeight: "500",
              marginTop: "40px",
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              dispatch(acceptCookiePolicy(true));
              setOpen(false);
            }}
            style={{
              float: "right",
              fontSize: "17px",
              color: "white",
              fontWeight: "500",
              marginTop: "40px",
            }}
          >
            Decline
          </Button>
        </ButtonGroup>
      </Grid>
    </Popup>
  );
};

export default CookiePolicy;
