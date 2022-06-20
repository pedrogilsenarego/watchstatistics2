import React, { useState, useEffect, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import Case from "../../../assets/Case.svg";
import Bracelet from "../../../assets/Bracelet.svg";
import Movement from "../../../assets/Movement.svg";
import Crown from "../../../assets/Crown.svg";
import Glass from "../../../assets/Glass.svg";
import Watch from "../WatchSolid";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  CardMedia,
} from "@material-ui/core";
import {
  LinearProgressBarColor,
  LinearProgressBarColor2,
  LinearProgressBarFormat,
  colorWatchParts,
  priceWatchParts,
} from "src/Utils/gamyfication";
import { randomWeightedNumber } from "src/Utils/math";
import { fetchRandomProduct } from "../../../redux/Products/products.actions";
import * as Styled from "./styles";
import Popup from "../../../components/Popup";
import BoosterSelection from "./BoosterSelection";
import useWatchParts from "./useWatchParts";

const WatchParts = ({ data, collectionFull, setBagFull }) => {
  const {
    dragging,
    dispatch,
    ready,
    setReady,
    openConfirmDelete,
    setOpenConfirmDelete,
    boostStatus,
    setBoostStatus,
    openPopupNewWatch,
    setOpenPopupNewWatch,
    randomProduct,
    currentUser,
    cartBoosters,
    handleDeleteWatchParts,
    shredderMeter,
    numberBoosters,
    fusionPrice,
    fusionGlass,
    fusionBracelet,
    fusionCase,
    fusionCrown,
    fusionMovement,
    setNumberBoosters,
    list,
    handleDragEnter,
    handleDragStart,
    fusionMatchParts,
    setFusionPrice,
    getStyles,
  } = useWatchParts({ setBagFull, data });

  const boosterValue = () => {
    if (fusionPrice === "0-200€") return cartBoosters.a;
    if (fusionPrice === "200-500€") return cartBoosters.b;
    if (fusionPrice === "500-1000€") return cartBoosters.c;
    if (fusionPrice === "1000-5000€") return cartBoosters.d;
    if (fusionPrice === "5000-10.000€") return cartBoosters.e;
    if (fusionPrice === "10.000-30.000€") return cartBoosters.f;
    if (fusionPrice === "30.000-50.000€") return cartBoosters.g;
    if (fusionPrice === "50.000-100.000€") return cartBoosters.h;
    if (fusionPrice === "100.000€+") return cartBoosters.i;
  };

  const whatImage = (item) => {
    if (item === "Case") return Case;
    if (item === "Glass") return Glass;
    if (item === "Bracelet") return Bracelet;
    if (item === "Movement") return Movement;
    if (item === "Crown") return Crown;
    else return null;
  };

  const handleFusionNewWatch = () => {
    const numbers = [
      1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8,
      8, 9,
    ];
    if (boostStatus === "false") {
      const randomValue = randomWeightedNumber(numbers);
      const configData = {
        ...currentUser,
        userID: currentUser.id,
        collection: currentUser.collection ? currentUser.collection : [],
        randomValue,
        fusionPrice,
      };
      dispatch(fetchRandomProduct(configData));
    }
    if (boostStatus === "fail") {
      const randomValue = randomWeightedNumber();
      const configData = {
        ...currentUser,
        userID: currentUser.id,
        collection: currentUser.collection ? currentUser.collection : [],
        boosters: currentUser.boosters
          ? currentUser.boosters - numberBoosters
          : 0,
        randomValue,
        fusionPrice,
      };
      dispatch(fetchRandomProduct(configData));
    }
    if (boostStatus === "true") {
      const baby = boosterValue();
      const configData = {
        ...currentUser,
        userID: currentUser.id,
        collection: currentUser.collection ? currentUser.collection : [],
        boosters: currentUser.boosters
          ? currentUser.boosters - numberBoosters
          : 0,
        fusionPrice,
        randomValue: baby.avgTotal,
      };
      dispatch(fetchRandomProduct(configData));
    }
    setOpenPopupNewWatch(true);
  };

  const boostStatusFalse = () => {
    setBoostStatus("false");
  };

  const boostStatusTrue = () => {
    setBoostStatus("true");
  };

  const boostStatusFail = () => {
    setBoostStatus("fail");
  };

  const configBoosterSelection = {
    boostStatusFalse,
    boostStatusTrue,
    boostStatusFail,
    numberBoosters,
    setNumberBoosters,
    fusionPrice,
  };

  const configWatch = {
    caseColor: fusionCase,
    glassColor: fusionGlass,
    movementColor: fusionMovement,
    crownColor: fusionCrown,
    braceletColor: fusionBracelet,
  };

  if (list) {
    return (
      <div>
        <Grid container style={{ paddingTop: "80px" }}>
          <Grid item xs={5}>
            <Watch {...configWatch} />
          </Grid>
          <Grid item xs={7}>
            <Paper
              style={{
                marginTop: "20px",
                marginRight: "10px",
                padding: "3px",
                backgroundColor: "#3C393900",
              }}
            >
              {list.map((grp, grpI) => (
                <Box
                  style={{
                    backgroundColor: "black",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={grp.title}
                  onDragEnter={
                    dragging && !grp.items.length
                      ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                      : null
                  }
                >
                  <Grid container>
                    <Grid xs={12}>
                      <Typography>{grp.title}</Typography>
                    </Grid>
                    <Grid xs={12} style={{ display: "flex" }}>
                      {grp.items.map((item, itemI) => (
                        <Box
                          onDragStart={(e) => {
                            handleDragStart(e, { grpI, itemI });
                          }}
                          onDragEnter={
                            dragging
                              ? (e) => handleDragEnter(e, { grpI, itemI })
                              : null
                          }
                          draggable={true}
                          key={item.id}
                          style={{
                            width: "45px",
                            height: "45px",
                            cursor: "pointer",
                            backgroundColor: dragging
                              ? getStyles({ grpI, itemI, item })
                              : colorWatchParts(item),
                            margin: "5px",
                            border: "solid 2px",
                            borderColor: colorWatchParts(item),
                            padding: "5px",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "center",
                            filter: "opacity(1) drop-shadow(2px 2px 5px red)",
                          }}
                        >
                          <img
                            src={whatImage(item.toString().slice(1))}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              padding: "5px",
                              filter: "opacity(1) drop-shadow(2px 2px 5px red)",
                            }}
                            alt=''
                          />
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Grid container style={{ display: "flex" }}>
                <Grid item xs={12} md={6}>
                  <Typography>
                    FUSION MACHINE - New watch to be obtained: {fusionPrice}{" "}
                  </Typography>

                  {list[1].items.length > 5 && (
                    <Typography style={{ color: "orange" }}>
                      You have to many parts on the fusion machine
                    </Typography>
                  )}
                  {!fusionMatchParts && (
                    <Typography style={{ color: "orange" }}>
                      You have Parts that are incompatible (different colors)
                    </Typography>
                  )}

                  {!ready &&
                    fusionBracelet &&
                    fusionCase &&
                    fusionGlass &&
                    fusionCrown &&
                    fusionMovement &&
                    fusionMatchParts &&
                    !collectionFull &&
                    list[1].items.length === 5 && (
                      <Button
                        onClick={() => {
                          setFusionPrice(priceWatchParts(list[1].items[0]));
                          setReady(true);
                        }}
                      >
                        Are you ready!
                      </Button>
                    )}
                  {ready && [
                    <BoosterSelection {...configBoosterSelection} />,
                    <Button
                      onClick={() => {
                        setReady(false);
                        handleFusionNewWatch();
                        handleDeleteWatchParts(list[1].items);
                      }}
                    >
                      Fusion!
                    </Button>,
                  ]}
                </Grid>
                <Grid item xs={12} md={6}>
                  {list[2].items.length > 0 && (
                    <Typography style={{ fusionPrice: "orange" }}>
                      Shredded Parts are gone!
                    </Typography>
                  )}
                  <Typography>
                    SHREDDING - New part that will be obtained:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "5px",
                    }}
                  >
                    <Styled.BorderLinearProgress
                      backColor={LinearProgressBarColor2(
                        shredderMeter(list[2].items)
                      )}
                      barColor={LinearProgressBarColor(
                        shredderMeter(list[2].items)
                      )}
                      variant='determinate'
                      value={LinearProgressBarFormat(
                        shredderMeter(list[2].items)
                      )}
                    />
                  </Box>
                  {!openConfirmDelete && (
                    <Button
                      onClick={() => {
                        setOpenConfirmDelete(true);
                      }}
                    >
                      <TiDelete fusionPrice='red' fontSize='3.5em' />
                      Shred Parts
                    </Button>
                  )}
                  {openConfirmDelete && (
                    <Button
                      onClick={() => {
                        setOpenConfirmDelete(false);
                        handleDeleteWatchParts(
                          list[2].items,
                          LinearProgressBarColor(shredderMeter(list[2].items)),
                          LinearProgressBarFormat(shredderMeter(list[2].items)),
                          LinearProgressBarColor2(shredderMeter(list[2].items))
                        );
                      }}
                    >
                      <TiDelete fusionPrice='red' fontSize='3.5em' />
                      I, Confirm
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
            {randomProduct && (
              <Popup
                openPopup={openPopupNewWatch}
                setOpenPopup={setOpenPopupNewWatch}
                title={"New Watch Alert!!"}
              >
                <CardMedia
                  style={{ height: "30vh" }}
                  image={
                    randomProduct.productThumbnail
                      ? randomProduct.productThumbnail[0]
                      : null
                  }
                ></CardMedia>
                <Typography
                  style={{
                    color: "black",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  Congratulations you added to your collection a:{" "}
                  {randomProduct.productBrand} {randomProduct.productName} Ref:{" "}
                  {randomProduct.reference}
                </Typography>
              </Popup>
            )}
          </Grid>
        </Grid>
      </div>
    );
  } else return <></>;
};
export default WatchParts;
