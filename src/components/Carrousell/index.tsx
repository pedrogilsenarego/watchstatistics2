import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Grid, Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Item from "./Item"
import { ItemP } from "./types"

interface Props {
  data: any;
  title: string,
}


const Carrousell = ({ data, title }: Props) => {
  const [buttonLeft, setButtonLeft] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [buttonRight, setButtonRight] = useState(true);
  const [x, setX] = useState(0);

  useEffect(() => {
    if (!data[1]) setButtonRight(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goLeft = () => {
    setX(x + 200);
  };
  const goRight = () => {
    setX(x - 200);
  };

  const handleGoRight = () => {
    if (!data[1]) return;
    if (x !== -400) {
      if (x === 0) {
        goRight();
        setButtonLeft(true);
        if (!data[2]) setButtonRight(false);
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

  if (data.length <= 0) return (<></>)

  return (
    <Container maxWidth={"xl"}>
      <Grid container style={{ marginTop: "15px" }} alignItems='center' columnGap={1}>
        <Grid item>
          <Typography style={{ letterSpacing: "2px" }} variant={"h6"}>{title}</Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{ height: isMatch ? "1.7em" : '1.5em', width: isMatch ? "1.7em" : '1.5em' }}
            style={{
              backgroundColor: buttonLeft ? "#ffffff1A" : "transparent",
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
            sx={{ height: isMatch ? "1.7em" : '1.5em', width: isMatch ? "1.7em" : '1.5em' }}
            style={{
              backgroundColor: buttonRight ? "#ffffff1A" : "transparent",

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
        style={{ display: "flex", marginTop: "6px" }}
      >
        {data.map((item: any, pos: number) => (
          <Grid
            container
            item
            key={pos}
            columnGap={0}
            rowGap={1}
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
