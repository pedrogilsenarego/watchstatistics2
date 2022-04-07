import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search";

import { CgMenuGridO } from "react-icons/cg";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";

import SignIn from "../SignIn";

import RightIconsNoUser from "./RightIconsNoUser";
import RightIconsUser from "./RightIconsUser";
import LeftIcons from "./LeftIcons";
import RightIconsBigUser from "./RightIconsBigUser";

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
      minWidth: "300px",

      [theme.breakpoints.up(750)]: {
        maxWidth: "350px",
      },
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
  const [anchorMediaMenu, setAnchorMediaMenu] = useState(null);
  const [anchorWatchStatistics, setAnchorWatchstatistics] = useState(null);
  const [mediaWatchstatisticsBtns, setMediaWatchstatisticsBtns] =
    useState(false);
  const [search, setSearch] = useState(false);

  const [watchstatistics, setWatchstatistics] = useState(true);

  //media

  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
    setWatchstatistics(true);
  };

  //RightIconsNoUser

  const handleLoginOpen = (e) => {
    setAnchorLogin(e.currentTarget);
  };

  const configRightIconsNoUser = {
    handleLoginOpen,
    search,
  };

  //RightIconsUser

  const handleMyAccountOpen = (e) => {
    setAnchorMyAccount(e.currentTarget);
  };
  const configRightIconsUser = {
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
  const handleCloseMediaMenu = () => {
    setAnchorMediaMenu(null);
    setMediaWatchstatisticsBtns(false);
  };
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
    <div>
      <AppBar position="fixed" elevation={0} className={classes.appbar}>
        <Toolbar>
          {isMatch ? (
            <>
              <Grid container>
                <Grid
                  item
                  xs={search ? 12 : 6}
                  style={{ display: "flex" }}
                  align="left"
                >
                  {!search && (
                    <Button
                      aria-controls="mediaMenu"
                      disableRipple
                      className={classes.textBtn}
                      activestyle={activeStyle}
                      onClick={(e) => {
                        setAnchorMediaMenu(e.currentTarget);
                      }}
                    >
                      <CgMenuGridO fontSize="2.5em" />
                    </Button>
                  )}

                  <Button
                    aria-controls="search"
                    disableRipple
                    className={classes.textBtn}
                    activestyle={activeStyle}
                    onClick={() => setSearch(!search)}
                  >
                    <FiSearch fontSize="2.5em" />
                  </Button>
                  {search && <Search {...configSearch} />}
                </Grid>
                <Grid
                  item
                  xs={search ? 0 : 6}
                  align="right"
                  style={{ marginTop: "3px" }}
                >
                  {currentUser && <RightIconsUser {...configRightIconsUser} />}
                  {!currentUser && (
                    <RightIconsNoUser {...configRightIconsNoUser} />
                  )}
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={7} className={classes.grid} align="left">
                <LeftIcons {...configLeftIcons} />
              </Grid>
              <Grid item xs={12} md={5} align="right">
                {currentUser && <RightIconsBigUser {...configRightIconsUser} />}
                {!currentUser && (
                  <RightIconsNoUser {...configRightIconsNoUser} />
                )}
              </Grid>{" "}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        disableScrollLock
        className={classes.menu}
        style={{}}
        id="messages"
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
        id="watchstatistics"
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
            history.push("/watchstatistics/addwatch");
          }}
        >
          Submit New Watch
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push("/watchstatistics/comparewatches");
          }}
        >
          Compare Watches
        </MenuItem>
      </Menu>
      <Menu
        disableScrollLock
        className={classes.menu}
        id="support"
        onClose={handleCloseSupportMenu}
        anchorEl={anchorSupport}
        open={Boolean(anchorSupport)}
      >
        <MenuItem
          disabled={watchstatistics}
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push("/watchstatistics/watchlaboratory");
          }}
        >
          Watch Laboratory
        </MenuItem>
        <MenuItem
          disabled={watchstatistics}
          onClick={() => {
            handleCloseWatchstatisticsMenu();
            history.push("/watchstatistics/market");
          }}
        >
          Market
        </MenuItem>
      </Menu>
      <Menu
        disableScrollLock
        className={classes.menu}
        id="MyAccount"
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
        id="mediaMenu"
        onClose={handleCloseMediaMenu}
        anchorEl={anchorMediaMenu}
        open={Boolean(anchorMediaMenu)}
      >
        <MenuItem
          className={classes.textBtn}
          activestyle={activeStyle}
          component={NavLink}
          disableRipple
          to="/"
          exact
        >
          <VscHome fontSize="1.5em" />
          &nbsp;Home
        </MenuItem>
        <MenuItem
          className={classes.textBtn}
          disableRipple
          style={
            mediaWatchstatisticsBtns
              ? { color: "#FFA500" }
              : { color: "#ffffff" }
          }
          onClick={(e) =>
            setMediaWatchstatisticsBtns(!mediaWatchstatisticsBtns)
          }
        >
          <BsGraphUp />
          &nbsp;WatchStatistics
        </MenuItem>
        {mediaWatchstatisticsBtns && [
          <MenuItem
            onClick={() => {
              history.push("/browse");
            }}
          >
            Browse
          </MenuItem>,

          <MenuItem
            disabled={watchstatistics}
            onClick={() => {
              history.push("/watchstatistics/addwatch");
            }}
          >
            Submit New Watch
          </MenuItem>,
          <MenuItem
            onClick={() => {
              handleCloseWatchstatisticsMenu();
              history.push("/watchstatistics/comparewatches");
            }}
          >
            Compare Watches
          </MenuItem>,
        ]}

        <MenuItem
          aria-controls="support"
          disableRipple
          className={classes.textBtn}
          activestyle={activeStyle}
          onClick={(e) => {
            setAnchorSupport(e.currentTarget);
          }}
        >
          <AiOutlineInfoCircle fontSize="1.5em" />
          &nbsp; Ecosystem
        </MenuItem>
      </Menu>

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

Header.defaultProps = {
  currentUser: null,
};

export default Header;
