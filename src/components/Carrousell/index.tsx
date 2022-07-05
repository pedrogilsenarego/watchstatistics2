import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Item from "./Item"
import { ItemP } from "./types"

interface Props {
  data: any;
  title: string
}


const Carrousell = ({ data, title }: Props) => {
  const [buttonLeft, setButtonLeft] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [buttonRight, setButtonRight] = useState(true);
  const [x, setX] = useState(0);


  const goLeft = () => {
    setX(x + 200);
  };
  const goRight = () => {
    setX(x - 200);
  };

  const handleGoRight = () => {
    if (data[1].length === 0) return;
    if (x !== -400) {
      if (x === 0) {
        goRight();
        setButtonLeft(true);
        if (data[2].length === 0) setButtonRight(false);
      }
      if (x === -200) {
        goRight();
        setButtonRight(false);
      }
    }
  };

  const handleGoLeft = () => {
    if (x !== 0) {
      goLeft();
      if (x === -200) {
        setButtonLeft(false);
        setButtonRight(true);
      }
      if (x === -400) {
        setButtonRight(true);
      }
    }
  };

  return (
    <Container maxWidth={"xl"}>
      <Grid container style={{ marginTop: "20px" }} alignItems='center'>
        <Grid item>
          <Typography variant={"h6"}>{title}</Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: "#ffffff00",
              cursor: buttonLeft ? "pointer" : "default",
            }}
            onClick={() => {
              handleGoLeft();
            }}
          >
            <IoIosArrowBack
              fontSize={isMatch ? "1.5em" : "1em"}
              color={buttonLeft ? "white" : "#ffffff00"}
            />
          </Avatar>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: "#ffffff00",

              cursor: buttonRight ? "pointer" : "default",
            }}
            onClick={() => {
              handleGoRight();
            }}
          >
            <IoIosArrowForward
              fontSize={isMatch ? "1.5em" : "1em"}
              color={buttonRight ? "white" : "#ffffff00"}
            />
          </Avatar>
        </Grid>
      </Grid>
      <Grid
        container
        wrap='nowrap'
        columnGap='100%'
        style={{ display: "flex", marginTop: "2px" }}
      >
        {data.map((item: any, pos: number) => (
          <Grid
            container
            item
            key={pos}
            columnGap={0}
            style={{
              display: "flex",
              minWidth: "100%",
              transition: "0.5s",
              transform: `translateX(${x}%)`,
            }}
          >
            {item.map((item: ItemP, pos: number) => {
              return (
                <Grid item key={pos} xs={6} md={3}>
                  <Item item={item} />
                </Grid>
              );
            })}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Carrousell;
