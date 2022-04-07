import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import Divider from "@mui/material/Divider";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

// eslint-disable-next-line
const WatchstatisticsSubHeader = ({}) => {
  const theme = useTheme();
  const history = useHistory();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser } = useSelector(mapState);

  const [progress, setProgress] = useState(0);
  const { userVotes, displayName, experience, watchesSubmited } = currentUser;

  const useStyles = makeStyles(() => ({
    root: {
      marginTop: "80px",

      paddingTop: "15px",
      paddingBottom: "15px",
      background: "#154A6799",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    container: {
      textAlign: "center",
      display: "flex",

      justifyContent: "center",
    },
    item: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    text: {},
  }));

  const classes = useStyles();

  const numberVotes = userVotes ? userVotes.length - 1 : 0;

  const rank = () => {
    if (!experience) return;
    if (experience < 20) return "Noob";
    if (experience < 100) return "Beginner";
    if (experience < 200) return "Enthusiast";
    if (experience < 500) return "Mature";
    if (experience < 1500) return "Connoisseour";
    if (experience < 5000) return "Geek Legend";
    else return "God";
  };

  useEffect(() => {
    if (rank() === "Noob") setProgress((experience / 20) * 100);
    if (rank() === "Beginner") setProgress(((experience - 20) / 80) * 100);
    if (rank() === "Enthusiast") setProgress(((experience - 100) / 100) * 100);
    if (rank() === "Mature") setProgress(((experience - 200) / 300) * 100);
    if (rank() === "Connoisseour")
      setProgress(((experience - 500) / 1000) * 100);
    if (rank() === "Geek legend")
      setProgress(((experience - 1500) / 3500) * 100);
    if (rank() === "God") setProgress(100);
    // eslint-disable-next-line
  }, []);

  const colorRank = () => {
    if (rank() === "Noob") return "#ffffff66";
    if (rank() === "Beginner") return "white";
    if (rank() === "Enthusiast") return "green";
    if (rank() === "Mature") return "blue";
    if (rank() === "Connoisseour") return "purple";
    if (rank() === "Geek Legend") return "orange";
    if (rank() === "God") return "red";
  };

  const avatarLetter = () => {
    if (displayName) {
      let str = displayName;
      let firstLetter = str.charAt(0);
      return firstLetter;
    } else return null;
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "black",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: colorRank(),
    },
  }));

  return (
    <div>
      <Container maxWidth={false} className={classes.root}>
        <Grid container className={classes.container}>
          <Grid
            item
            container
            xs={12}
            sm={6}
            alignItems="center"
            className={classes.item}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              container
              xs={12}
              md={4}
              justifyContent={isMatch ? "center" : "flex-end"}
              style={{}}
            >
              <Avatar
                onClick={() => {
                  history.push(`/dashboard`);
                }}
                sx={{
                  bgcolor: "#A91D07",
                  width: isMatch ? 90 : 74,
                  height: isMatch ? 90 : 74,
                  border: "solid 1.5px",
                  borderColor: "#ffffff66",
                }}
                style={{
                  float: isMatch ? null : "right",

                  cursor: "pointer",
                }}
              >
                <Typography style={{ fontSize: "40px", color: "white" }}>
                  {avatarLetter()}
                </Typography>
              </Avatar>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{ marginTop: isMatch ? "10px" : "0px" }}
            >
              <Typography
                className={classes.text}
                variant="h4"
                style={{
                  fontFamily: "Open Sans Condensed,sans-serif",
                }}
              >
                Welcome, {displayName}
              </Typography>
              <Typography
                className={classes.text}
                variant="h6"
                style={{
                  color: "#ffffffB3",
                  fontFamily: "Open Sans Condensed,sans-serif",
                }}
              >
                have you voted today?
              </Typography>
            </Grid>
          </Grid>
          {isMatch && (
            <Divider
              style={{
                width: "100%",
                background: theme.palette.text.faded3,
                marginTop: "10px",
              }}
            />
          )}

          <Grid
            container
            item
            xs={12}
            sm={6}
            alignItems="center"
            justifyContent="center"
            className={classes.item}
            style={{ marginTop: isMatch ? "10px" : "0px" }}
          >
            <Grid item xs={12} md={12}>
              <Typography
                variant="h6"
                className={classes.text}
                style={{
                  color: "#ffffffB3",
                  fontFamily: "Open Sans Condensed,sans-serif",
                }}
              >
                Watches Voted: {numberVotes}
              </Typography>
              <Typography
                variant="h6"
                className={classes.text}
                style={{
                  color: "#ffffffB3",
                  fontFamily: "Open Sans Condensed,sans-serif",
                }}
              >
                Watches Submited: {watchesSubmited}
              </Typography>
              <Typography
                variant="h6"
                className={classes.text}
                style={{
                  color: colorRank(),
                  fontFamily: "Open Sans Condensed,sans-serif",
                }}
              >
                Rank: {rank()}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "5px",
                }}
              >
                <BorderLinearProgress
                  style={{ width: "50%" }}
                  variant="determinate"
                  value={progress}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default WatchstatisticsSubHeader;
