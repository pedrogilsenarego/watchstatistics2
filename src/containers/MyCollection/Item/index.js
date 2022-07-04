import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Box, Card, Grid, Tooltip, Divider } from "@mui/material";
import CardMedia from "src/components/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Popup from "../../../components/Popup";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { updateCollectionStatus } from "../../../redux/User/user.actions";
import { setToAuction } from "../../../redux/Market/market.actions";
import SellPopup from "./SellPopup";
import * as GeneralStyled from "src/styles/styles";
import { watchTotalValue, starRatingColor } from "src/Utils/gamyfication";
import CircularVotes from "src/components/ProgressBars/CircularVotes";
import StarRatings from "react-star-ratings";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Item = ({ item, products }) => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [watch, setWatch] = useState();
  const [openDeleteWatchPopup, setOpenDeleteWatchPopup] = useState();
  const [openSellWatchPopup, setOpenSellWatchPopup] = useState();
  const { collection, boosters } = currentUser;

  const positionOnCollection = () => {
    var value = null;
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === item.documentID) value = i;
    }
    return value;
  };

  const handleWatch4BoosterPopup = () => {
    setWatch(
      item.productBrand +
        " " +
        item.productName +
        " " +
        "with a value of " +
        totalValue
    );
    setOpenDeleteWatchPopup(true);
  };

  const handleWatch4SellConfirm = (values) => {
    const { price } = values;
    const oldArray = [...collection];
    oldArray.splice(positionOnCollection(), 1);
    const configData = {
      ...currentUser,
      flag: "sell",
      userID: currentUser.id,
      collection: oldArray,
    };
    dispatch(updateCollectionStatus(configData));
    const configOrder = {
      productBrand: item.productBrand,
      productName: item.productName,
      id: item.documentID,
      reference: item.reference,
      generalState: item.generalState,
      polishState: item.polishState,
      movementState: item.movementState,
      price: price,
      avgTotal: item.avgTotal,
      image: item.productThumbnail[0],
    };
    console.log(configOrder);
    dispatch(setToAuction(configOrder));
    setOpenSellWatchPopup(false);
  };

  const handleWatch4BoosterConfirm = () => {
    const oldArray = [...collection];
    const boostersIncreased = boosters ? boosters + 1 : 1;
    oldArray.splice(positionOnCollection(), 1);
    const configData = {
      ...currentUser,
      flag: "boosters",
      boosters: boostersIncreased,
      userID: currentUser.id,
      collection: oldArray,
    };
    dispatch(updateCollectionStatus(configData));
    setOpenDeleteWatchPopup(false);
  };

  const handleWatch4SellPopup = () => {
    setWatch(
      item.productBrand +
        " " +
        item.productName +
        " " +
        "with a value of " +
        totalValue
    );
    setOpenSellWatchPopup(true);
  };

  const configSellPopup = {
    openSellWatchPopup,
    watch,
    handleWatch4SellConfirm,
    setOpenSellWatchPopup,
  };

  const individualRating = useMemo(
    () => {
      const value = (
        (item.generalState + item.polishState + item.movementState) /
        6
      ).toFixed(1);
      return Number(value);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const totalValue = useMemo(
    () =>
      watchTotalValue(
        Number(item.avgTotal),
        item.generalState,
        item.polishState,
        item.movementState
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card style={{ backgroundColor: "#18161E" }}>
        <CardMedia
          height='120'
          onClick={() => {
            history.push(`/product/${item.documentID}`);
          }}
          image={item.productThumbnail?.[0] || ""}
        />
        <CardContent style={{ minHeight: "15vh" }}>
          <Grid container>
            <Tooltip
              arrow
              placement='top'
              title={`${item.productBrand} ${item.productName} ${item.reference}`}
            >
              <Grid
                item
                xs={12}
                style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              >
                <GeneralStyled.BasicTypography fontSize='18px'>
                  {item.productBrand} {item.productName} {item.reference}
                </GeneralStyled.BasicTypography>
              </Grid>
            </Tooltip>
            <GeneralStyled.DashedGrid
              container
              columnSpacing={1}
              alignItems='center'
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={8}>
                <GeneralStyled.BasicTypography fontSize='14px' color='orange'>
                  Condition:
                </GeneralStyled.BasicTypography>
                <GeneralStyled.BasicTypography fontSize='14px'>
                  General: {item.generalState}
                </GeneralStyled.BasicTypography>
                <GeneralStyled.BasicTypography fontSize='14px'>
                  Movement: {item.movementState}
                </GeneralStyled.BasicTypography>
                <GeneralStyled.BasicTypography fontSize='14px'>
                  Polish: {item.polishState}
                </GeneralStyled.BasicTypography>
              </Grid>
              <Grid item xs={4}>
                <CircularVotes avgTotal={item.avgTotal} customSize={60} />
              </Grid>
              <Grid item xs={12}>
                <Divider
                  style={{
                    width: "100%",
                    background: "#ffffff66",
                    marginTop: "2px",
                    marginBottom: "2px",
                  }}
                />
                <GeneralStyled.BasicTypography fontSize='14px' fontWeight={700}>
                  Power: {totalValue}
                </GeneralStyled.BasicTypography>

                <Box style={{ marginTop: "40px", marginBottom: "-5px" }}>
                  <StarRatings
                    starDimension='15px'
                    starSpacing='5px'
                    rating={individualRating || 0}
                    starRatedColor={starRatingColor(individualRating || 0)}
                    starEmptyColor='#ffffff33'
                  />
                </Box>
              </Grid>
            </GeneralStyled.DashedGrid>
          </Grid>
        </CardContent>

        <CardActions disableSpacing>
          <ButtonGroup>
            <Button
              style={{
                color: "white",
              }}
              size='small'
              onClick={() => {
                handleWatch4BoosterPopup();
              }}
            >
              Trade for Boosters
            </Button>
            <Button
              style={{
                color: "white",
              }}
              onClick={() => {
                handleWatch4SellPopup();
              }}
            >
              Sell
            </Button>
          </ButtonGroup>
        </CardActions>
        <SellPopup {...configSellPopup} />
      </Card>

      <Popup
        title={"Danger!!"}
        openPopup={openDeleteWatchPopup}
        setOpenPopup={setOpenDeleteWatchPopup}
      >
        <Typography style={{ color: "black" }}>
          You are Deleting a: {watch}, this is not reversible.
        </Typography>
        <Typography style={{ color: "black" }}>
          You will receive 1 Booster
        </Typography>
        <ButtonGroup>
          <Button
            onClick={() => {
              handleWatch4BoosterConfirm();
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              setOpenDeleteWatchPopup(false);
            }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Popup>
    </Grid>
  );
};

export default Item;
