import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Divider } from "@mui/material";
import Popup from "../../../components/Popup";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { updateCollectionStatus } from "../../../redux/User/user.actions";
import { setToAuction } from "../../../redux/Market/market.actions";
import SellPopup from "./SellPopup";
import * as GeneralStyled from "src/styles/styles";
import { watchTotalValue } from "src/Utils/gamyfication";
import CircularVotes from "src/components/ProgressBars/CircularVotes";

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

  const totalValue = useMemo(
    () =>
      watchTotalValue(
        Number(item?.avgTotal),
        item?.generalState,
        item.polishState,
        item.movementState
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!Array.isArray(products)) return;

  return (
    <Grid item xs={3}>
      <Card style={{ backgroundColor: "#18161E" }}>
        <CardMedia
          component='img'
          height='120'
          onClick={() => {
            history.push(`/product/${item}`);
          }}
          image={item.productThumbnail?.[0] || ""}
          alt='Paella dish'
          style={{ cursor: "pointer" }}
        />
        <CardContent style={{ minHeight: "15vh" }}>
          <Grid container>
            <GeneralStyled.BasicTypography fontSize='18px'>
              {item.productBrand} {item.productName} {item.reference}
            </GeneralStyled.BasicTypography>
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
                <GeneralStyled.BasicTypography fontSize='14px'>
                  Total Score: {totalValue}
                </GeneralStyled.BasicTypography>
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
              disabled
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
