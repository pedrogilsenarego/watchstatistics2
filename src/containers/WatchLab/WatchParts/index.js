import Case from "../../../assets/Case.svg";
import Bracelet from "../../../assets/Bracelet.svg";
import Movement from "../../../assets/Movement.svg";
import Crown from "../../../assets/Crown.svg";
import Glass from "../../../assets/Glass.svg";
import Watch from "../WatchSolid";
import { Grid, Typography, Box, CardMedia } from "@mui/material";
import { colorWatchParts } from "src/Utils/gamyfication";
import * as GeneralStyled from "src/styles/styles";
import * as Styled from "./styles";
import Popup from "../../../components/Popup";
import useWatchParts from "./useWatchParts";
import Shredder from "./Shredder";
import Fusion from "./Fusion";

const WatchParts = ({ data, collectionFull, setBagFull }) => {
  const {
    dragging,
    ready,
    setReady,
    setBoostStatus,
    openPopupNewWatch,
    setOpenPopupNewWatch,
    modalProduct,
    handleDeleteWatchParts,
    numberBoosters,
    fusionPrice,
    fusionGlass,
    fusionBracelet,
    fusionCase,
    fusionCrown,
    fusionMovement,
    setNumberBoosters,
    list,
    fusionMatchParts,
    setFusionPrice,
    handleDragStart,
    handleDragEnter,
    shredderMeter,
    openConfirmDelete,
    setOpenConfirmDelete,
    getStyles,
    handleFusionNewWatch,
  } = useWatchParts({ setBagFull, data });

  const whatImage = (item) => {
    if (item === "Case") return Case;
    if (item === "Glass") return Glass;
    if (item === "Bracelet") return Bracelet;
    if (item === "Movement") return Movement;
    if (item === "Crown") return Crown;
    else return null;
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

  const configWatch = {
    caseColor: fusionCase,
    glassColor: fusionGlass,
    movementColor: fusionMovement,
    crownColor: fusionCrown,
    braceletColor: fusionBracelet,
  };

  const configShredder = {
    setBagFull,
    data,
    shredderMeter,
    openConfirmDelete,
    setOpenConfirmDelete,
    handleDeleteWatchParts,
    list,
  };

  const configFusion = {
    fusionPrice,
    list,
    fusionMatchParts,
    ready,
    fusionGlass,
    fusionBracelet,
    fusionCase,
    fusionCrown,
    fusionMovement,
    collectionFull,
    setFusionPrice,
    setReady,
    handleFusionNewWatch,
    handleDeleteWatchParts,
    boostStatusFalse,
    boostStatusTrue,
    boostStatusFail,
    numberBoosters,
    setNumberBoosters,
  };

  if (list) {
    return (
      <Grid container style={{ paddingTop: "100px" }}>
        <Grid item xs={5}>
          <Watch {...configWatch} />
        </Grid>
        <Grid item xs={7}>
          <Styled.Paper style={{ marginRight: "20px" }}>
            <Grid container rowGap={2} columnSpacing={2}>
              {list.map((grp, grpI) => (
                <Grid item xs={grpI > 0 ? 6 : 12}>
                  <GeneralStyled.BasicTypography>
                    {grp.title}
                  </GeneralStyled.BasicTypography>
                  <Styled.Paper style={{ marginTop: "5px" }}>
                    <Styled.PartsBox
                      key={grp.title}
                      onDragEnter={
                        dragging && !grp.items.length
                          ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                          : null
                      }
                    >
                      <Grid container>
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
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                                backgroundColor: dragging
                                  ? getStyles({ grpI, itemI, item })
                                  : colorWatchParts(item),
                                margin: "5px",
                                border: "solid 2px",
                                borderColor: colorWatchParts(item),
                                padding: "0px",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                filter:
                                  "opacity(1) drop-shadow(2px 2px 5px red)",
                              }}
                            >
                              <img
                                src={whatImage(item.toString().slice(1))}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  padding: "5px",
                                  filter:
                                    "opacity(1) drop-shadow(2px 2px 5px red)",
                                }}
                                alt=''
                              />
                            </Box>
                          ))}
                        </Grid>
                      </Grid>
                    </Styled.PartsBox>
                    {grpI === 2 && <Shredder {...configShredder} />}
                    {grpI === 1 && <Fusion {...{ ...configFusion }} />}
                  </Styled.Paper>
                </Grid>
              ))}
            </Grid>
          </Styled.Paper>

          <Popup
            clickToClose
            openPopup={openPopupNewWatch}
            setOpenPopup={setOpenPopupNewWatch}
            title={"New Watch Alert!!"}
          >
            <CardMedia
              style={{ height: "30vh" }}
              image={
                modalProduct.productThumbnail
                  ? modalProduct.productThumbnail[0]
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
              {modalProduct.productBrand || ""} {modalProduct.productName || ""}{" "}
              Ref: {modalProduct.reference || ""}
            </Typography>
          </Popup>
        </Grid>
      </Grid>
    );
  } else return <></>;
};
export default WatchParts;
