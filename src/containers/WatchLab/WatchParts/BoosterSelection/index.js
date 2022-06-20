import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { boosterValue } from "src/Utils/gamyfication";
import { generalEndpoints } from "src/constants/endpoints";

const mapState = (state) => ({
  cartBoosters: state.cartData.cartBoosters,
  currentUser: state.user.currentUser,
});

const BoosterSelection = ({
  fusionPrice,
  boostStatusFalse,
  boostStatusTrue,
  boostStatusFail,
  numberBoosters,
  setNumberBoosters,
}) => {
  const history = useHistory();
  const { cartBoosters, currentUser } = useSelector(mapState);
  //const [numberBoosters, setNumberBoosters] = useState(0);
  const [decreaseDisable, setDecreaseDisable] = useState(true);
  const [increaseDisable, setIncreaseDisable] = useState(false);
  const [confirmBoost, setConfirmBoost] = useState(false);
  const [boostBeingUsed, setBoostBeingUsed] = useState(false);

  const boosterPercentage = () => {
    if (fusionPrice === "0-200€") return 50;
    if (fusionPrice === "200-500€") return 40;
    if (fusionPrice === "500-1000€") return 25;
    if (fusionPrice === "1000-5000€") return 20;
    if (fusionPrice === "5000-10.000€") return 10;
    if (fusionPrice === "10.000-30.000€") return 5;
    if (fusionPrice === "30.000-50.000€") return 4;
    if (fusionPrice === "50.000-100.000€") return 2;
    if (fusionPrice === "100.000€+") return 1;
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function boostPercentage() {
    const value = boosterPercentage() * numberBoosters;
    if (value <= 100) return value;
    else return 100;
  }

  function doBoost() {
    if (getRandomInt(1, 100) <= boostPercentage()) {
      boostStatusTrue();
    } else {
      boostStatusFail();
    }
  }

  console.log(boostPercentage());

  const handleIncrementBooster = () => {
    setNumberBoosters(numberBoosters + 1);
    setDecreaseDisable(false);
    setBoostBeingUsed(true);
    if (numberBoosters === currentUser.boosters) setIncreaseDisable(true);
  };

  const handleDecreaseBooster = () => {
    setNumberBoosters(numberBoosters - 1);
    setIncreaseDisable(false);
  };

  useEffect(() => {
    if (numberBoosters === 0) {
      setDecreaseDisable(true);
      setBoostBeingUsed(false);
    }
    if (currentUser.boosters === numberBoosters) setIncreaseDisable(true);
    // eslint-disable-next-line
  }, [numberBoosters]);

  if (!cartBoosters)
    return (
      <div>
        <Typography>
          You have no assigned any prefered watch for this price brackets click
          here to choose it if you want
        </Typography>
        <Button
          onClick={() => {
            history.push(`/search`);
          }}
        >
          Here
        </Button>
      </div>
    );
  else
    return (
      <Box sx={{ display: "flex", alignContent: "center" }}>
        {boosterValue(fusionPrice, cartBoosters) ? (
          <Grid container>
            <Grid item xs={6}>
              <Typography>
                For this price Bracket you have selected a{" "}
                {boosterValue(fusionPrice, cartBoosters)?.productBrand}{" "}
                {boosterValue(fusionPrice, cartBoosters)?.productName} you have{" "}
                {currentUser.boosters
                  ? currentUser.boosters - numberBoosters
                  : 0}{" "}
                Boosters, select the number to use.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <CardMedia
                style={{ width: "80px", height: "80px" }}
                image={
                  boosterValue(fusionPrice, cartBoosters)?.productThumbnail[0]
                }
              ></CardMedia>
            </Grid>
            <ButtonGroup>
              <Button
                disabled={decreaseDisable}
                onClick={() => {
                  handleDecreaseBooster();
                }}
              >
                -
              </Button>
              <Button>{numberBoosters}</Button>
              <Button
                disabled={increaseDisable}
                onClick={() => {
                  handleIncrementBooster();
                }}
              >
                +
              </Button>
            </ButtonGroup>
            <Typography>Boost this watch by: {boostPercentage()}%</Typography>
            {!confirmBoost && boostBeingUsed && (
              <Button
                onClick={() => {
                  doBoost();
                  setConfirmBoost(true);
                }}
              >
                I do wanna Boost
              </Button>
            )}
            {confirmBoost &&
              boostBeingUsed && [
                <Typography>
                  You will use {numberBoosters} boosters are you sure?
                </Typography>,
                <Button
                  onClick={() => {
                    boostStatusFalse();
                    setConfirmBoost(false);
                  }}
                >
                  Cancel
                </Button>,
              ]}
          </Grid>
        ) : (
          <Typography>
            You do not have a watch selected to be boosted in this watch range,
            click{" "}
            <b onClick={() => history.push(generalEndpoints.BROWSE)}>here</b> to
            choose one
          </Typography>
        )}
      </Box>
    );
};

export default BoosterSelection;
