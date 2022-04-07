import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestProductsStart } from "../../../redux/Products/products.actions";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  products: state.productsData.latestProducts,
});

const pageSize = 12;

const Sugested2Vote = () => {
  const dispatch = useDispatch();
  const { products, currentUser } = useSelector(mapState);
  const [buttonLeft, setButtonLeft] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [buttonRight, setButtonRight] = useState(true);
  const [x, setX] = useState(0);

  const { data } = products;

  const filterData = () => {
    if (!currentUser.userVotes || !data) return [[], [], []];
    else {
      const newData = [];
      for (let i = 0; i < data.length; i++) {
        if (!currentUser.userVotes.includes(data[i].documentID)) {
          newData.push(data[i]);
        }
      }
      const newData1 = newData.slice(0, 4);
      const newData2 = newData.slice(5, 8);
      const newData3 = newData.slice(9, 12);

      const finalArray = [newData1, newData2, newData3];
      return finalArray;
    }
  };

  useEffect(
    () => {
      dispatch(fetchLatestProductsStart({ pageSize }));
      if (filterData()[1].length === 0) setButtonRight(false);
    },
    // eslint-disable-next-line
    []
  );

  if (!Array.isArray(data)) return null;

  const goLeft = () => {
    setX(x + 98.5);
  };
  const goRight = () => {
    setX(x - 98.5);
  };

  const handleGoRight = () => {
    if (filterData()[1].length === 0) return;
    if (x !== -197) {
      if (x === 0) {
        goRight();
        setButtonLeft(true);
        if (filterData()[2].length === 0) setButtonRight(false);
      }
      if (x === -98.5) {
        goRight();
        setButtonRight(false);
      }
    }
  };

  const handleGoLeft = () => {
    if (x !== 0) {
      goLeft();
      if (x === -98.5) {
        setButtonLeft(false);
        setButtonRight(true);
      }
      if (x === -197) {
        setButtonRight(true);
      }
    }
  };

  if (data.length < 1) {
    return (
      <div>
        <p>No search Results</p>
      </div>
    );
  }
  if (filterData()[0].length === 0) return null;

  return (
    <div>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
        style={{
          display: "flex",
          minWidth: "100%",
          paddingTop: isMatch ? "-1.7vh" : "0px",
          position: "absolute",
          paddingLeft: isMatch ? "70vw" : "0vw",
        }}
      >
        <Avatar
          style={{
            backgroundColor: "#ffffff00",
            marginRight: isMatch ? "2vw" : "90vw",
            cursor: buttonLeft ? "pointer" : "default",
            zIndex: "2",
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

        <Avatar
          style={{
            backgroundColor: "#ffffff00",
            zIndex: "2",
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
      </Box>
      <div
        style={{ marginTop: "50px", marginLeft: "5.5vw", marginRight: "4vw" }}
      >
        <Typography variant={"h6"}>Sugested for you to vote</Typography>

        <Grid
          container
          wrap="nowrap"
          spacing={"10.5vw"}
          style={{ display: "flex", marginTop: "5px" }}
        >
          {filterData().map((item, pos) => (
            <Grid
              container
              item
              spacing={"1.5vw"}
              style={{
                display: "flex",
                paddingTop: "10px",
                minWidth: "100%",

                transition: "0.5s",
                transform: `translateX(${x}%)`,
              }}
            >
              {item.map((item, pos) => {
                const configItem = { currentUser };

                return (
                  <Grid item key={pos} xs={6} md={3}>
                    <Item item={item} {...configItem} />
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Sugested2Vote;
