import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { boosterValue, boosterPercentage } from "src/Utils/gamyfication";
import { getRandomInt } from "src/containers/WatchLab/helpers";
import { generalEndpoints } from "src/constants/endpoints";
import * as GeneralStyles from "src/styles/styles";

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

  function boostPercentage() {
    const value = boosterPercentage(fusionPrice) * numberBoosters;
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

  return (
    <GeneralStyles.DashedGrid>
      {boosterValue(fusionPrice, cartBoosters) ? (
        <Grid
          container
          columnSpacing={1}
          justifyContent='center'
          alignContent='center'
        >
          <Grid item xs={9}>
            <GeneralStyles.BasicTypography>
              For this price Bracket you have selected to boost a{" "}
              <b style={{ color: "orange" }}>
                {boosterValue(fusionPrice, cartBoosters)?.productBrand}{" "}
                {boosterValue(fusionPrice, cartBoosters)?.productName}
              </b>{" "}
              you have{" "}
              <b style={{ color: "orange" }}>
                {currentUser.boosters
                  ? currentUser.boosters - numberBoosters
                  : 0}{" "}
                Boosters
              </b>
              , select how many to use.
            </GeneralStyles.BasicTypography>
          </Grid>
          <Grid item xs={3}>
            <CardMedia
              style={{ width: "80px", height: "80px", borderRadius: "5px" }}
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
    </GeneralStyles.DashedGrid>
  );
};

export default BoosterSelection;
