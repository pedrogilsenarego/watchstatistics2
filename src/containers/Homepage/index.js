import React from "react";
import SugestedVote from "./SugestedVote";
import Sugested2Market from "./Sugested2Market";
import Next from "./Next";
import { Grid } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Next />
      <Grid container rowGap={3}>
        <SugestedVote />

        <Sugested2Market />
      </Grid>
    </>
  );
};

export default HomePage;
