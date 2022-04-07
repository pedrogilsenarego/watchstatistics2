import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MenuItem, Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import SignIn from "../../../containers/SignIn";

const img1 =
  "https://dlmag.com/wp-content/uploads/2020/08/How-to-start-luxury-watch-collection_img1.jpg";
const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: "70px",
    "& .MuiPaper-root": {
      backgroundColor: "#040406BF",
      color: "#ffffff",
      disableScrollLock: true,
      minWidth: "300px",

      [theme.breakpoints.up(750)]: {
        maxWidth: "350px",
      },
    },
  },
}));
const Intro = () => {
  const [anchorLogin, setAnchorLogin] = useState(null);
  const classes = useStyles();

  const handleCloseLoginMenu = () => {
    setAnchorLogin(null);
  };
  const handleLoginOpen = (e) => {
    setAnchorLogin(e.currentTarget);
  };
  const configMenuLogin = {
    handleCloseLoginMenu,
  };

  return (
    <div>
      <Box style={{ height: "70vh", overflow: "hidden" }}>
        <Grid
          container
          style={{
            position: "absolute",
            zIndex: "2",
            marginTop: "20vh",
            paddingLeft: "4vw",
          }}
        >
          <Grid container item xs={10} sm={8} md={6} lg={5} xl={3.3}>
            {" "}
            <Typography
              style={{
                fontWeight: "bold",
              }}
              variant="h3"
            >
              Find what enthusiasts think of every watch
            </Typography>
            <Typography variant="h6">
              Welcome to an open community where the opinion on each watch is
              added by their members. Gain points, build your own virtual
              collection and trade with other members.
            </Typography>
            <Grid item style={{ display: "flex" }}>
              <Button
                aria-controls="login"
                variant="contained"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(214,121,41,1) 50%, rgba(193,74,27,1) 100%)",
                  marginTop: "5px",
                }}
                onClick={(e) => handleLoginOpen(e)}
              >
                Start Here
              </Button>
              <Box style={{ marginLeft: "10px", marginTop: "10px" }}>
                <AiOutlineDoubleLeft color={"lightGrey"} fontSize={"2em"} />
              </Box>
              <Box style={{ marginLeft: "10px", marginTop: "10px" }}>
                <AiOutlineDoubleLeft color={"lightGrey"} fontSize={"2em"} />
              </Box>
              <Box style={{ marginLeft: "10px", marginTop: "10px" }}>
                <AiOutlineDoubleLeft color={"lightGrey"} fontSize={"2em"} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <img
          style={{ filter: "grayscale(100%) brightness(0.4)", float: "right" }}
          src={img1}
          alt=""
        />
      </Box>
      <Menu
        disableScrollLock
        className={classes.menu}
        id="login"
        onClose={handleCloseLoginMenu}
        anchorEl={anchorLogin}
        open={Boolean(anchorLogin)}
        anchorReference="none"
        PaperProps={{
          style: {
            left: "50%",
            transform: "translateX(-50%) translateY(15%)",
          },
        }}
      >
        <MenuItem disableRipple>
          <SignIn {...configMenuLogin} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Intro;
