import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Button3 from "src/components/Buttons/Button3";
import { useHistory } from "react-router-dom";
import { boosterValue, boosterPercentage } from "src/Utils/gamyfication";
import { getRandomInt } from "src/containers/WatchLab/helpers";
import { generalEndpoints } from "src/constants/endpoints";
import * as GeneralStyles from "src/styles/styles";
import IncreaseDecreaseButton from "src/components/Buttons/IncreaseDecreaseButton";

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
  const [confirmBoost, setConfirmBoost] = useState(false);
  const [boostBeingUsed, setBoostBeingUsed] = useState(false);
  const [maxPercentageBoost, setMaxPercentageBoost] = useState(false);

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

  useEffect(() => {
    if (numberBoosters > 0) {
      setBoostBeingUsed(true);
    } else setBoostBeingUsed(false);
    if (boostPercentage() === 100) {
      setMaxPercentageBoost(true);
    } else setMaxPercentageBoost(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberBoosters]);

  return (
    <GeneralStyles.DashedGrid>
      {boosterValue(fusionPrice, cartBoosters) ? (
        <Grid
          container
          columnSpacing={1}
          rowGap={2}
          justifyContent='center'
          alignItems='center'
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
                Boosters{" "}
              </b>
              left, select how many to use.
            </GeneralStyles.BasicTypography>
          </Grid>
          <Grid item xs={3} textAlign='end'>
            <CardMedia
              style={{ width: "80px", height: "80px", borderRadius: "5px" }}
              image={
                boosterValue(fusionPrice, cartBoosters)?.productThumbnail[0]
              }
            ></CardMedia>
          </Grid>
          <Grid item xs={6}>
            <IncreaseDecreaseButton
              maxValue={currentUser?.boosters}
              setValue={setNumberBoosters}
              incDisabled={maxPercentageBoost}
            />
          </Grid>
          <Grid item xs={6} textAlign='end'>
            <GeneralStyles.BasicTypography>
              Boost this watch by:{" "}
              <b style={{ color: "orange" }}>{boostPercentage()}%</b>
            </GeneralStyles.BasicTypography>
          </Grid>
          {!confirmBoost && boostBeingUsed && (
            <Grid item xs={12} textAlign='end'>
              <Button3
                title='Confirm Use of Boosts'
                onClick={() => {
                  doBoost();
                  setConfirmBoost(true);
                }}
              />
            </Grid>
          )}
          {confirmBoost && boostBeingUsed && (
            <>
              <GeneralStyles.BasicTypography>
                You will use {numberBoosters} boosters are you sure?
              </GeneralStyles.BasicTypography>
              <Button3
                title='Cancel'
                onClick={() => {
                  boostStatusFalse();
                  setConfirmBoost(false);
                }}
              />
            </>
          )}
        </Grid>
      ) : (
        <GeneralStyles.BasicTypography>
          You do not have a watch selected to be boosted in this watch range,
          click{" "}
          <b
            onClick={() => history.push(generalEndpoints.BROWSE)}
            style={{ color: "orange", cursor: "pointer" }}
          >
            here
          </b>{" "}
          to choose one
        </GeneralStyles.BasicTypography>
      )}
    </GeneralStyles.DashedGrid>
  );
};

export default BoosterSelection;
