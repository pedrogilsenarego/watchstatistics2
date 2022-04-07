import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Popup from "../../../containers/controls/Popup";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { updateCollectionStatus } from "../../../redux/User/user.actions";
import { setToAuction } from "../../../redux/Market/market.actions";
import SellPopup from "./SellPopup";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Item = ({ item, pos, relativePos, products }) => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [watch, setWatch] = useState();
  const [posWatch, setPosWatch] = useState();
  const [openDeleteWatchPopup, setOpenDeleteWatchPopup] = useState();
  const [openSellWatchPopup, setOpenSellWatchPopup] = useState();
  const { collection, boosters } = currentUser;

  const handleWatch4BoosterPopup = (pos, item) => {
    setWatch(
      products[relativePos[pos]].productBrand +
        " " +
        products[relativePos[pos]].productName
    );
    setPosWatch(pos);
    setOpenDeleteWatchPopup(true);
  };
  const handleWatch4SellConfirm = (values) => {
    const { price } = values;
    const oldArray = collection;
    oldArray.splice(posWatch, 1);
    const configData = {
      ...currentUser,
      flag: "sell",
      userID: currentUser.id,
      collection: oldArray,
    };
    dispatch(updateCollectionStatus(configData));
    const configOrder = {
      productBrand: products[relativePos[pos]].productBrand,
      productName: products[relativePos[pos]].productName,
      productID: item,
      reference: products[relativePos[pos]].reference,
      price: price,
    };
    dispatch(setToAuction(configOrder));
    setOpenSellWatchPopup(false);
  };

  const handleWatch4BoosterConfirm = (watchPos) => {
    const oldArray = collection;
    const boostersIncreased = boosters ? boosters + 1 : 1;
    oldArray.splice(watchPos, 1);
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

  const handleWatch4SellPopup = (pos, item) => {
    setWatch(
      products[relativePos[pos]].productBrand +
        " " +
        products[relativePos[pos]].productName
    );
    setPosWatch(pos);
    setOpenSellWatchPopup(true);
  };

  const configSellPopup = {
    openSellWatchPopup,
    watch,
    handleWatch4SellConfirm,
    setOpenSellWatchPopup,
  };

  if (!Array.isArray(products)) return;

  return (
    <Grid item xs={3}>
      <Card style={{ backgroundColor: "#18161E" }}>
        <CardMedia
          component="img"
          height="120"
          onClick={() => {
            history.push(`/product/${item}`);
          }}
          image={products[relativePos[pos]].productThumbnail[0]}
          alt="Paella dish"
          style={{ cursor: "pointer" }}
        />
        <CardContent style={{ minHeight: "15vh" }}>
          <Typography style={{ fontSize: "12px", color: "white" }}>
            {products[relativePos[pos]].productBrand}{" "}
            {products[relativePos[pos]].productName}{" "}
            {products[relativePos[pos]].reference}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ButtonGroup>
            {!products[relativePos[pos]] && (
              <Button
                style={{
                  color: "white",
                }}
                size="small"
                onClick={() => {
                  history.push(`/product/${item}`);
                }}
              >
                {item}
              </Button>
            )}

            <Button
              style={{
                color: "white",
              }}
              size="small"
              onClick={() => {
                handleWatch4BoosterPopup(pos, item);
              }}
            >
              Trade for Boosters
            </Button>
            <Button
              style={{
                color: "white",
              }}
              onClick={() => {
                handleWatch4SellPopup(pos, item);
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
          You are Trading a: {watch}, this is not reversible.
        </Typography>
        <Typography style={{ color: "black" }}>
          You will receive 1 Booster
        </Typography>
        <ButtonGroup>
          <Button
            onClick={() => {
              handleWatch4BoosterConfirm(posWatch);
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
