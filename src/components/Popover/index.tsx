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
  anchor: Element;
  setAnchor: React.Dispatch<React.SetStateAction<Boolean>>;
  message: string;
}

const PopoverM = ({ anchor, setAnchor, message }: Iprops) => {
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
      <Typography style={{ margin: "5px", fontSize: "14px" }}>
        {message}
      </Typography>
    </Popover>
  );
};

export default PopoverM;
