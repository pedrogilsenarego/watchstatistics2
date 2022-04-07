import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { VscAccount } from "react-icons/vsc";

const useStyles = makeStyles((theme) => ({
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
}));

const RightIconsUser = ({ handleMyAccountOpen, search }) => {
  const classes = useStyles();
  const activeStyle = { color: "#FFA500" };

  return (
    <>
      {!search && (
        <Button
          className={classes.textBtn}
          activestyle={activeStyle}
          aria-controls="myAccount"
          disableRipple
          onClick={(e) => handleMyAccountOpen(e)}
        >
          <VscAccount fontSize="1.5em" />
          &nbsp;
        </Button>
      )}
    </>
  );
};

export default RightIconsUser;
