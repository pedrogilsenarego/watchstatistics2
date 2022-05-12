import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import { Typography, Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import Divider from "@mui/material/Divider";
import ImageThumbs from "./ImageThumbs";
import AddAdditionalPicture from "./ImageThumbs/AddAditionalPicture";
import { i18n } from "src/translations/i18n";
import CircularVotes from "src/components/CircularVotes";

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
  currentUser
}) => {
  const [mainImage, setMainImage] = useState(productThumbnail[0]);
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

  const handleOnImgError = () => {
    setReadySubmit(false);
    setErrorImage(true);
  };

  useEffect(() => {
    if (errorImage) setErrorImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImage]);

  return (
    <>
      {productThumbnail && (
        <Card style={{ backgroundColor: "#18161E" }}>
          {!errorImage && (
            <img
              onError={handleOnImgError}
              style={{
                width: "100%",
                objectFit: "cover",
                height: mobile ? "75vh" : "70vh",
              }}
              src={mainImage}
              alt=''
            />
          )}
          {errorImage && (
            <Grid
              container
              justifyContent='center'
              alignItems='center'
              style={{
                height: "70vh",
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
                setMainImage={setMainImage}
                mainImage={mainImage}
                addAdditionalPictures={addAdditionalPictures}
                setAddAdditionalPictures={setAddAdditionalPictures}
                productThumbnail={productThumbnail}
                currentUser={currentUser}
              />
            )}

            {isMatch && (
              <>
                <Grid item xs={10}>
                  <ImageThumbs
                    setMainImage={setMainImage}
                    mobile={isMatch}
                    mainImage={mainImage}
                    addAdditionalPictures={addAdditionalPictures}
                    setAddAdditionalPictures={setAddAdditionalPictures}
                    productThumbnail={productThumbnail}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Box display='flex' justifyContent='center'>
                    <CircularVotes
                      avgTotal={avgTotal}
                      customSize={45}
                      customFontSize='12px'
                    />
                  </Box>
                </Grid>
              </>
            )}

            {isMatch && (
              <>
                <Divider
                  style={{
                    width: "100%",
                    background: "#ffffff66",
                    marginTop: "5px",
                  }}
                />
                <Grid
                  container
                  style={{ marginTop: "5px" }}
                  justifyContent='center'
                >
                  <Box item xs={12} alignText='center'>
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
                </Grid>
              </>
            )}
            <Grid xs={12} sm={4} item>
              {!isMatch && <AvatarsControllers {...configAvatarControllers} />}
            </Grid>
            {addAdditionalPictures && (
              <Grid xs={12} item>
                <AddAdditionalPicture
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
