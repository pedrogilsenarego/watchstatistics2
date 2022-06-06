import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { Typography, Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import ImageThumbs from "./ImageThumbs";
import AddAdditionalPicture from "./ImageThumbs/AddAditionalPicture";
import { i18n } from "src/translations/i18n";
import CircularVotes from "src/components/ProgressBars/CircularVotes";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import "./styles.scss";
import { useField } from "formik";
import MobileRemoveImageList from "./ImageThumbs/MobileRemoveImageList";

const ImageMain = ({
  isMatch,
  productThumbnail,
  product,
  cartItems,
  productID,
  productBrand,
  productName,
  reference,
  avgTotal,
  compareWatches,
  currentUser,
  newWatch,
  setProductThumbnail,
}) => {
  const [mainImage, setMainImage] = useState(productThumbnail[0]);
  const [indexMini, setIndexMini] = useState(0);
  const [readySubmit, setReadySubmit] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [addAdditionalPictures, setAddAdditionalPictures] = useState(false);
  const [removeAdditionalPictures, setRemoveAdditionalPictures] =
    useState(false);
  const [originalPictureNewWatch, setOriginalPictureNewWatch] = useState(true);
  const [showImageRemoveList, setShowImageRemoveList] = useState(false);
  const [, , helpersProductThumbnail] = useField("productThumbnail");
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const configAvatarControllers = {
    product,
    isMatch,
    cartItems,
    productID,
    productBrand,
    productName,
    reference,
    avgTotal,
    compareWatches,
  };
  const IMAGE_HEIGHT_MOBILE = "80vh";
  const IMAGE_HEIGHT_LAPTOP = "70vh";
  const NO_IMAGE =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

  const handleOnImgError = () => {
    setReadySubmit(false);
    setErrorImage(true);
  };
  useEffect(() => {
    if (errorImage) setErrorImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImage]);

  useEffect(() => {
    if (newWatch) setAddAdditionalPictures(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWatch]);

  const mouseDownCoords = (e) => {
    window.checkForDrag = e.clientX;
  };
  const clickOrDrag = (e) => {
    const mouseUp = e.clientX;
    if (
      mouseUp < window.checkForDrag + 5 &&
      mouseUp > window.checkForDrag - 5
    ) {
    }
  };

  const handleRemoveThumb = (pos) => {
    const newArray = [...productThumbnail];
    newArray.splice(pos, 1);
    if (newArray.length === 0) {
      setOriginalPictureNewWatch(true);
      setAddAdditionalPictures(true);
      helpersProductThumbnail.setValue([]);
      setRemoveAdditionalPictures(false);
      setShowImageRemoveList(false);
      newArray.push(NO_IMAGE);
    } else helpersProductThumbnail.setValue(newArray);
    setProductThumbnail(newArray);
  };

  return (
    <>
      {productThumbnail && (
        <Card style={{ backgroundColor: "#18161E" }}>
          {!errorImage && (
            <CarouselProvider
              naturalSlideWidth={100}
              totalSlides={productThumbnail.length}
              currentSlide={indexMini}
              lockOnWindowScroll
              touchEnabled={isMatch ? true : false}
              dragEnabled={isMatch ? true : false}
              style={{ position: "relative" }}
            >
              {isMatch && (
                <>
                  {newWatch &&
                    !addAdditionalPictures &&
                    currentUser &&
                    !showImageRemoveList &&
                    !removeAdditionalPictures && (
                      <MdRemoveCircle
                        style={{
                          position: "absolute",
                          left: "35px",
                          bottom: "25px",
                          zIndex: "1000",
                        }}
                        size='2.5em'
                        color='red'
                        onClick={() => setShowImageRemoveList(true)}
                      />
                    )}
                  {!addAdditionalPictures &&
                    currentUser &&
                    !showImageRemoveList &&
                    !removeAdditionalPictures &&
                    productThumbnail.length < 4 && (
                      <MdAddCircle
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          left: "5px",
                          bottom: "25px",
                          zIndex: "1000",
                        }}
                        size='2.5em'
                        color='orange'
                        onClick={() => {
                          setAddAdditionalPictures(true);
                        }}
                      />
                    )}
                  {!newWatch && (
                    <Box
                      display='flex'
                      justifyContent='center'
                      style={{
                        position: "absolute",
                        right: "5px",
                        bottom: "25px",
                        backgroundColor: "#000000CC",
                        zIndex: "1000",
                        padding: "5px",
                        borderRadius: "8px",
                      }}
                    >
                      <CircularVotes
                        avgTotal={avgTotal}
                        customSize={45}
                        customFontSize='12px'
                      />
                    </Box>
                  )}
                </>
              )}
              <Slider
                onMouseDown={(e) => mouseDownCoords(e)}
                onMouseUp={(e) => clickOrDrag(e)}
              >
                {productThumbnail.map((image, pos) => {
                  return (
                    <Slide
                      index={pos}
                      style={{
                        height: mobile
                          ? IMAGE_HEIGHT_MOBILE
                          : IMAGE_HEIGHT_LAPTOP,
                      }}
                    >
                      <img
                        onError={handleOnImgError}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "100%",
                          cursor: "Pointer",
                        }}
                        src={readySubmit ? mainImage : image}
                        alt=''
                      />
                    </Slide>
                  );
                })}
              </Slider>
              {isMatch && (
                <>
                  <Box
                    display='flex'
                    justifyContent='center'
                    style={{ marginTop: "5px" }}
                  >
                    <DotGroup
                      className='prc-dotGroup'
                      style={{ transform: "scale(0.6)" }}
                    />
                  </Box>
                </>
              )}
            </CarouselProvider>
          )}
          {errorImage && (
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              style={{
                height: isMatch ? IMAGE_HEIGHT_MOBILE : IMAGE_HEIGHT_LAPTOP,
                color: "white",
              }}
            >
              <Grid item xs={12} alignText='center'>
                <Typography variant='h3'>
                  {i18n.t("forms.imageCheck")}
                </Typography>
              </Grid>
            </Grid>
          )}

          <Grid
            container
            alignItems='center'
            justifyContent={"center"}
            style={{ marginLeft: "-2px" }}
          >
            {!isMatch && (
              <ImageThumbs
                removeAdditionalPictures={removeAdditionalPictures}
                setRemoveAdditionalPictures={setRemoveAdditionalPictures}
                index={indexMini}
                setIndex={setIndexMini}
                setMainImage={setMainImage}
                mainImage={mainImage}
                addAdditionalPictures={addAdditionalPictures}
                setAddAdditionalPictures={setAddAdditionalPictures}
                productThumbnail={productThumbnail}
                setProductThumbnail={setProductThumbnail}
                currentUser={currentUser}
                newWatch={newWatch}
                setOriginalPictureNewWatch={setOriginalPictureNewWatch}
              />
            )}
            {isMatch && (
              <>
                <Box
                  container
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                  justifyContent='center'
                  alignItems='center'
                  textAlign='center'
                >
                  <Typography
                    style={{
                      color: "#ffffff66",
                    }}
                    variant='h6'
                  >
                    <b>
                      {productBrand} {productName}
                    </b>{" "}
                    - {reference}
                  </Typography>
                </Box>
              </>
            )}
            <Grid xs={12} sm={4} item>
              {!isMatch && !newWatch && (
                <AvatarsControllers {...configAvatarControllers} />
              )}
            </Grid>
            {addAdditionalPictures && productThumbnail.length < 4 && (
              <Grid xs={12} item style={{ padding: "10px" }}>
                <AddAdditionalPicture
                  setIndexMini={setIndexMini}
                  setProductThumbnail={setProductThumbnail}
                  productThumbnail={productThumbnail}
                  newWatch={newWatch}
                  readySubmit={readySubmit}
                  setReadySubmit={setReadySubmit}
                  setAddAdditionalPicture={setAddAdditionalPictures}
                  setMainImage={setMainImage}
                  originalPictureNewWatch={originalPictureNewWatch}
                  setOriginalPictureNewWatch={setOriginalPictureNewWatch}
                />
              </Grid>
            )}
            {showImageRemoveList && (
              <Grid xs={12} item style={{ padding: "10px" }}>
                <MobileRemoveImageList
                  setProductThumbnail={setProductThumbnail}
                  productThumbnail={productThumbnail}
                  handleRemoveThumb={handleRemoveThumb}
                  setShowImageRemoveList={setShowImageRemoveList}
                />
              </Grid>
            )}
          </Grid>
        </Card>
      )}
    </>
  );
};

export default ImageMain;
