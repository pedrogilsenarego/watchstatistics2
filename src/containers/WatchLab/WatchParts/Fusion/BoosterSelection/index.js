import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import {
  boosterValue,
  boosterPercentage,
  boosterCap,
} from "src/Utils/gamyfication";
import { getRandomInt } from "src/containers/WatchLab/helpers";
import { generalEndpoints } from "src/constants/endpoints";
import * as GeneralStyles from "src/styles/styles";
import IncreaseDecreaseButton from "src/components/Buttons/IncreaseDecreaseButton";
import CheckBox from "src/components/Inputs/CheckBox";

const mapState = (state) => ({
  cartBoosters: state.cartData.cartBoosters,
  currentUser: state.user.currentUser,
});

const BoosterSelection = ({
  boostStatus,
  fusionPrice,
  boostStatusFalse,
  boostStatusTrue,
  boostStatusFail,
  numberBoosters,
  setNumberBoosters,
}) => {
  const history = useHistory();
  const { cartBoosters, currentUser } = useSelector(mapState);
  const [boostBeingUsed, setBoostBeingUsed] = useState(false);
  const [maxPercentageBoost, setMaxPercentageBoost] = useState(false);
  const [customChecked, setCustomChecked] = useState(false);

  function boostPercentage() {
    const value = boosterPercentage(fusionPrice) * numberBoosters;
    if (value <= 100) return value;
    else return 100;
  }

  function doBoost() {
    if (boostStatus === "true" || "fail") boostStatusFalse();
    if (boostStatus === "false") {
      if (getRandomInt(1, 100) <= boostPercentage()) {
        boostStatusTrue();
      } else {
        boostStatusFail();
      }
    }
  }

  useEffect(() => {
    boostStatusFalse();
    if (numberBoosters > 0) {
      setBoostBeingUsed(true);
    } else setBoostBeingUsed(false);
    if (boostPercentage() >= boosterCap(fusionPrice)) {
      setMaxPercentageBoost(true);
    } else setMaxPercentageBoost(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberBoosters]);

  useEffect(() => {
    if (boostStatus === "false") setCustomChecked(false);
    else setCustomChecked(true);
  }, [boostStatus]);

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
          <Grid item xs={4}>
            <IncreaseDecreaseButton
              maxValue={currentUser?.boosters}
              setValue={setNumberBoosters}
              incDisabled={maxPercentageBoost}
            />
          </Grid>
          <Grid item xs={8} textAlign='end'>
            <GeneralStyles.BasicTypography>
              Boost this watch by:{" "}
              <b style={{ color: "orange" }}>{boostPercentage()}%</b>
            </GeneralStyles.BasicTypography>
          </Grid>
          {boostBeingUsed && (
            <Grid item xs={12} textAlign='end'>
              <CheckBox
                customChecked={customChecked}
                color='green'
                label='Confirm Boost'
                handleChange={() => {
                  doBoost();
                }}
              />
            </Grid>
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
          if you want to boost
        </GeneralStyles.BasicTypography>
      )}
    </GeneralStyles.DashedGrid>
  );
};

export default BoosterSelection;
