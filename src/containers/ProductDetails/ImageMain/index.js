import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { Typography, Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import ImageThumbs from "./ImageThumbs";
import AddAdditionalPicture from "./ImageThumbs/AddAditionalPicture";
import { i18n } from "src/translations/i18n";
import CircularVotes from "src/components/CircularVotes";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

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

  const handleOnImgError = () => {
    setReadySubmit(false);
    setErrorImage(true);
  };
  useEffect(() => {
    if (errorImage) setErrorImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImage]);

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
                <Box
                  display='flex'
                  justifyContent='center'
                  style={{
                    position: "absolute",
                    right: "5px",
                    bottom: "17px",
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
                  <Box display='flex' justifyContent='center'>
                    <DotGroup />
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
                index={indexMini}
                setIndex={setIndexMini}
                setMainImage={setMainImage}
                mainImage={mainImage}
                addAdditionalPictures={addAdditionalPictures}
                setAddAdditionalPictures={setAddAdditionalPictures}
                productThumbnail={productThumbnail}
                currentUser={currentUser}
                newWatch={newWatch}
              />
            )}
            {isMatch && (
              <>
                <Box
                  container
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                  justifyContent='center'
                  alignItems='center'
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
            {(addAdditionalPictures || newWatch) && (
              <Grid xs={12} item>
                <AddAdditionalPicture
                  setProductThumbnail={setProductThumbnail}
                  productThumbnail={productThumbnail}
                  newWatch={newWatch}
                  readySubmit={readySubmit}
                  setReadySubmit={setReadySubmit}
                  setAddAdditionalPicture={setAddAdditionalPictures}
                  setMainImage={setMainImage}
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
