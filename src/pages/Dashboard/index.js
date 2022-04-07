import React, { useState } from "react";

import OrderHistory from "../../containers/OrderHistory";
import VisualPref from "../../containers/DashBoard/VisualPref";
import UserPref from "../../containers/DashBoard/UserPref";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Dashboard = (props) => {
  const [userPref, setUserPref] = useState(true);
  const [visualPref, setVisualPref] = useState(false);
  const [voteHistory, setVoteHistory] = useState(false);

  const handleResetState = () => {
    setUserPref(false);
    setVoteHistory(false);
    setVisualPref(false);
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ marginTop: "100px" }}
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Container style={{ backgroundColor: "#154A6799" }}>
          <Button
            style={{ color: userPref ? "orange" : "white" }}
            onClick={() => {
              handleResetState();
              setUserPref(true);
            }}
          >
            User Preferences
          </Button>
          <Button
            style={{ color: visualPref ? "orange" : "white" }}
            onClick={() => {
              handleResetState();
              setVisualPref(true);
            }}
          >
            Visual Preferences
          </Button>

          <Button
            style={{ color: "#ffffff66" }}
            disabled
            onClick={() => {
              handleResetState();
              setVoteHistory(true);
            }}
          >
            Vote History
          </Button>
        </Container>
      </Grid>
      <Grid item xs={12} md={5}>
        {userPref && <UserPref />}
        {visualPref && <VisualPref />}
        {voteHistory && <OrderHistory />}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
