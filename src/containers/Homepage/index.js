import React from "react";
import Sugested2Vote from "./Sugested2Vote";
import Next from "./Next";
import { useTheme, useMediaQuery } from "@mui/material";

const HomePage = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {mobile === "teste" && <Next />}
      <Sugested2Vote />
    </>
  );
};

export default HomePage;
