import React from "react";
import Popover from "@mui/material/Popover";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#000000CE",
      color: "#ffffffCC",
    },
    marginTop: "10px",
  },
}));

interface Iprops {
  anchor: any;
  setAnchor: any;
  message?: string;
  children?: JSX.Element;
}

const PopoverM = ({ anchor, setAnchor, message, children }: Iprops) => {
  const classes = useStyles();

  return (
    <Popover
      className={classes.root}
      style={{ pointerEvents: "none" }}
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={() => {
        setAnchor(false);
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Typography style={{ margin: "5px", fontSize: "16px" }}>
        {message}
        {children}
      </Typography>
    </Popover>
  );
};

export default PopoverM;
