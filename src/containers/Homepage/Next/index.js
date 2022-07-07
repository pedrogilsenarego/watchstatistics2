import {
  Box,
  Container,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { generalEndpoints } from "src/constants/endpoints";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const useStyles = makeStyles((theme) => ({
  textBtn: {
    color: "#FFFFFF !important",
    fontSize: "13px",
    "&:hover": {
      color: "#FFA500",
    },
    "&:active": {
      color: "#FFFFFF",
    },
  },
}));

const Next = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser } = useSelector(mapState);

  const userPoints = () => {
    const userPoints = {
      title: `Spend Points: ${currentUser?.points}`,
      link: mobile ? generalEndpoints.SHOP : generalEndpoints.WATCH_LABORATORY,
    };
    return userPoints;
  };

  const submitNewWatch = () => {
    const newWatch = {
      title: "Submit New Watch",
      link: generalEndpoints.SUBMIT_WATCHES,
    };
    return newWatch;
  };

  const openBoxes = () => {
    const openBoxes = {
      title: `Open Boxes: ${
        currentUser?.whiteBox ||
        0 + currentUser?.blueBox ||
        0 + currentUser?.purpleBox ||
        0 + currentUser?.orangeBox ||
        0
      }`,
      link: generalEndpoints.WATCH_LABORATORY,
    };
    return openBoxes;
  };

  const nextItems = () => {
    const initialArray = [];
    if (currentUser?.points > 4) initialArray.push(userPoints());
    if (
      currentUser?.whiteBox > 0 ||
      currentUser?.blueBox > 0 ||
      currentUser?.purpleBox > 0 ||
      currentUser?.orangeBox > 0
    )
      initialArray.push(openBoxes());
    if (currentUser?.watchesSubmited < 10) initialArray.push(submitNewWatch());
    return initialArray;
  };
  return (
    <Container maxWidth='xl'>
      <Box>
        <Grid container spacing={2} style={{ marginTop: "0px" }}>
          {nextItems().map((item, pos) => {
            return (
              <Grid item key={pos}>
                <Button
                  onClick={() => history.push(`${item.link}`)}
                  disableRipple
                  className={classes.textBtn}
                  style={{
                    backgroundColor: "#18161E",
                    textTransform: "none",
                    borderRadius: "14px",
                  }}
                >
                  <Typography
                    style={{
                      color: "#ffffff66",
                      fontFamily: "Open Sans Condensed,sans-serif",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Next;
