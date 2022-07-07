import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import {
  Grid,
  MenuItem,
  Toolbar,
  AppBar,
  Button,
  Menu,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";

import { CgMenuGridO } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";

import SignIn from "../SignIn";
import DrawerMine from "src/components/Drawer";
import MobileMainDrawer from "./MobileMainDrawer";
import MobileSecondaryDrawer from "./MobileSecondaryDrawer";

import RightIconsNoUser from "./RightIconsNoUser";
import RightIconsUser from "./RightIconsUser";
import LeftIcons from "./LeftIcons";
import RightIconsBigUser from "./RightIconsBigUser";
import { generalEndpoints } from "src/constants/endpoints";

const useStyles = makeStyles((theme) => ({
  appbar: {
    elevation: 0,
    background: "linear-gradient(180deg,#040406, #04040600)",
    height: "80px",
    paddingTop: "5px",

    "&:hover": {
      background: "linear-gradient(180deg,#040406, #04040680)",
    },
  },
  grid: {},
  textBtn: {
    color: "#FFFFFF",
    fontSize: "13px",
    "&:hover": {
      color: "#FFA500",
    },
    "&:active": {
      color: "#FFFFFF",
    },
  },

  menu: {
    marginTop: "70px",
    "& .MuiPaper-root": {
      backgroundColor: "#040406BF",
      color: "#ffffff",
      disableScrollLock: true,
    },
  },
}));

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const activeStyle = { color: "#FFA500" };
  const [messageStatus, setMessageStatus] = useState(0);
  const [anchorMessages, setAnchorMessages] = useState(null);
  const [anchorSupport, setAnchorSupport] = useState(null);
  const [anchorMyAccount, setAnchorMyAccount] = useState(null);
  const [anchorLogin, setAnchorLogin] = useState(null);
  const [anchorWatchStatistics, setAnchorWatchstatistics] = useState(null);
  const [search, setSearch] = useState(false);

  const [watchstatistics, setWatchstatistics] = useState(true);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [mobileDrawerSecondary, setMobileDrawerSecondary] = useState(false);

  //media

  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
    setWatchstatistics(true);
  };

  //RightIconsNoUser

  const configRightIconsNoUser = {
    setMobileDrawerSecondary,
    search,
  };

  //RightIconsUser

  const handleMyAccountOpen = (e) => {
    setAnchorMyAccount(e.currentTarget);
  };
  const configRightIconsUser = {
    setMobileDrawerSecondary,
    handleMyAccountOpen,
    messageStatus,
    search,
  };

  //leftIconst
  const handleSupportOpen = (e) => {
    setAnchorSupport(e.currentTarget);
  };
  const handleWatchstatisticsOpen = (e) => {
    setAnchorWatchstatistics(e.currentTarget);
  };
  const configLeftIcons = {
    handleWatchstatisticsOpen,
    handleSupportOpen,
  };

  //next
  const handleCloseMessagesMenu = () => {
    setAnchorMessages(null);
  };

  const handleCloseLoginMenu = () => {
    setAnchorLogin(null);
  };

  const configMenuLogin = {
    handleCloseLoginMenu,
  };

  const handleCloseWatchstatisticsMenu = () => {
    setAnchorWatchstatistics(null);
  };

  const handleCloseMyAccountMenu = () => {
    setAnchorMyAccount(null);
  };

  const handleCloseSupportMenu = () => {
    setAnchorSupport(null);
  };

  useEffect(
    () => {
      if (currentUser) {
        setWatchstatistics(false);
        if (currentUser.messages) {
          setMessageStatus(currentUser.messages.length);
        }
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );

  const theme = useTheme();

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const configSearch = { isMatch };

  return (
    <>
      <AppBar position='fixed' elevation={0} className={classes.appbar}>
        <Toolbar disableGutters>
          {isMatch ? (
            <>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  {!search && (
                    <Button
                      aria-controls='mediaMenu'
                      disableRipple
                      className={classes.textBtn}
                      activestyle={activeStyle}
                      onClick={() => {
                        setMobileDrawer(true);
                      }}
                    >
                      <CgMenuGridO fontSize='2.5em' />
                    </Button>
                  )}

                  <Button
                    aria-controls='search'
                    disableRipple
                    className={classes.textBtn}
                    activestyle={activeStyle}
                    onClick={() => setSearch(!search)}
                  >
                    <FiSearch fontSize='2.5em' />
                  </Button>
                  {search && <Search {...configSearch} />}
                </Grid>
                <Grid item style={{ marginTop: "3px", marginRight: "10px" }}>
                  {currentUser && <RightIconsUser {...configRightIconsUser} />}
                  {!currentUser && (
                    <RightIconsNoUser {...configRightIconsNoUser} />
                  )}
                </Grid>
              </Grid>
            </>
          ) : (
            <Container maxWidth={"xxl"}>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  <LeftIcons {...configLeftIcons} />
                </Grid>
                <Grid item>
                  {currentUser && (
                    <RightIconsBigUser {...configRightIconsUser} />
                  )}
                  {!currentUser && (
                    <RightIconsNoUser {...configRightIconsNoUser} />
                  )}
                </Grid>{" "}
              </Grid>
            </Container>
          )}
        </Toolbar>
      </AppBar>
      <DrawerMine
        id={0}
        position='left'
        fullHeight
        openDrawer={mobileDrawer}
        setOpenDrawer={setMobileDrawer}
      >
        <MobileMainDrawer setMobileDrawer={setMobileDrawer} />
      </DrawerMine>
      <DrawerMine
        id={0}
        fullHeight
        fullWidth
        position='right'
        openDrawer={mobileDrawerSecondary}
        setOpenDrawer={setMobileDrawerSecondary}
      >
        <MobileSecondaryDrawer setMobileDrawer={setMobileDrawerSecondary} />
      </DrawerMine>
      <Menu
        disableScrollLock
        className={classes.menu}
        style={{}}
        id='messages'
        onClose={handleCloseMessagesMenu}
        anchorEl={anchorMessages}
        open={Boolean(anchorMessages)}
      >
        {messageStatus === 1 && (
          <MenuItem
            style={{ color: "#FFA500" }}
            onClick={handleCloseMessagesMenu}
          >
            VERIFY account to use WatchStatistics
          </MenuItem>
        )}
      </Menu>
      <Menu
        disableScrollLock
        className={classes.menu}
        id='watchstatistics'
        onClose={handleCloseWatchstatisticsMenu}
        anchorEl={anchorWatchStatistics}
        open={Boolean(anchorWatchStatistics)}
      >
        <MenuItem
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push("/browse");
          }}
        >
          Browse
        </MenuItem>

        <MenuItem
          disabled={watchstatistics}
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push(generalEndpoints.SUBMIT_WATCHES);
          }}
        >
          Submit New Watch
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push(generalEndpoints.COMPARE_WATCHES);
          }}
        >
          Compare Watches
        </MenuItem>
      </Menu>
      <Menu
        disableScrollLock
        className={classes.menu}
        id='support'
        onClose={handleCloseSupportMenu}
        anchorEl={anchorSupport}
        open={Boolean(anchorSupport)}
      >
        <MenuItem
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push(generalEndpoints.WATCH_LABORATORY);
          }}
        >
          Watch Laboratory
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push(generalEndpoints.MARKET);
          }}
        >
          Market
        </MenuItem>
      </Menu>
      <Menu
        disableScrollLock
        className={classes.menu}
        id='MyAccount'
        onClose={handleCloseMyAccountMenu}
        anchorEl={anchorMyAccount}
        open={Boolean(anchorMyAccount)}
      >
        <MenuItem
          onClick={() => {
            history.push("/mycollection");
          }}
        >
          My Collection
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          DashBoard
        </MenuItem>
        {isMatch && (
          <MenuItem
            onClick={() => {
              handleCloseMyAccountMenu();

              history.push("/messages");
            }}
          >
            messages ({messageStatus})
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            signOut();
            handleCloseMyAccountMenu();
            setWatchstatistics(false);
            history.push("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <Menu
        disableScrollLock
        className={classes.menu}
        id='login'
        onClose={handleCloseLoginMenu}
        anchorEl={anchorLogin}
        open={Boolean(anchorLogin)}
        anchorReference='none'
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
    </>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
