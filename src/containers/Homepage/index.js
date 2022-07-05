import React from "react";
import Sugested2Vote from "./Sugested2Vote";
import Sugested2Market from "./Sugested2Market";
import Next from "./Next";
import { Grid } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Next />
      <Grid container rowGap={1}>
        <Sugested2Vote />
        <Sugested2Market />
      </Grid>
    </>
  );
};

export default HomePage;
