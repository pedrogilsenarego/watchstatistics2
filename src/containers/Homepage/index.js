import React from "react";
import Sugested2Vote from "./Sugested2Vote";
import Sugested2Market from "./Sugested2Market";
import Next from "./Next";

const HomePage = () => {
  return (
    <>
      <Next />
      <Sugested2Vote />
      <Sugested2Market />
    </>
  );
};

export default HomePage;
