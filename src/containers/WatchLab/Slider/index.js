import React from "react";
import Container from "@mui/material/Container";
import Boxes from "../Boxes";
import Boxes2 from "../Boxes2";
import Boxes3 from "../Boxes3";

const Slider = ({ x }) => {
  const configBox = {
    x,
  };

  let sliderArr = [
    <Boxes
      {...configBox}
      color='#E5E4E1'
      metalness='0.5'
      roughness='0.1'
      clearcoatRoughness='0.9'
    />,
    <Boxes2
      {...configBox}
      color='#155C9B'
      metalness='0.9'
      roughness='0.5'
      clearcoatRoughness='0.1'
    />,
    <Boxes3
      {...configBox}
      color='purple'
      metalness='0.9'
      roughness='0.5'
      clearcoatRoughness='0.1'
    />,
    4,
  ];

  return (
    <div style={{ height: "100vh", width: "100%", display: "flex" }}>
      {sliderArr.map((item, index) => {
        return (
          <Container
            style={{
              minWidth: "100%",
              zIndex: "1",
              transition: "0.5s",
              transform: `translateX(${x}%)`,
            }}
            key={index}
          >
            {item}
          </Container>
        );
      })}
    </div>
  );
};

export default Slider;
