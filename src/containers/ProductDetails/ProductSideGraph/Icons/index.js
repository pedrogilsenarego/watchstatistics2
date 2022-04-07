import React, { useState } from "react";
import { Box } from "@mui/material";
import Popover from "../../../../components/Popover";

const Icons = ({ item, pos, returnLabel }) => {
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <Box
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
        onMouseOver={(e) => {
          setAnchor(e.currentTarget);
        }}
        onMouseOut={() => {
          setAnchor(null);
        }}
        style={{
          minHeight: "35px",
          minWidth: "35px",
          cursor: "pointer",
          backgroundColor: "#ffffff00",
          position: "absolute",
          marginTop: `${item.y}px`,
          marginLeft: `${item.x}px`,
        }}
      />
      <Popover
        anchor={anchor}
        setAnchor={setAnchor}
        message={returnLabel(pos)}
      />
    </>
  );
};

export default Icons;
