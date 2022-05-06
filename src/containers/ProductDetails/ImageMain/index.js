import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import Divider from "@mui/material/Divider";
import ImageThumbs from "./ImageThumbs";
import AddAdditionalPicture from "./ImageThumbs/AddAditionalPicture";

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
}) => {
  const [mainImage, setMainImage] = useState(productThumbnail[0]);
  const [readySubmit, setReadySubmit] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [addAdditionalPictures, setAddAdditionalPictures] = useState(false);

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
                height: "70vh",
              }}
              src={mainImage ? mainImage : productThumbnail[0]}
              alt=''
            />
          )}
          {errorImage && (
            <Box
              style={{
                height: "70vh",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              This image has issues
            </Box>
          )}

          <Grid
            container
            alignItems='center'
            justifyContent='center'
            style={{ marginTop: "5px" }}
          >
            <ImageThumbs
              setMainImage={setMainImage}
              mainImage={mainImage}
              addAdditionalPictures={addAdditionalPictures}
              setAddAdditionalPictures={setAddAdditionalPictures}
              productThumbnail={productThumbnail}
            />
            {isMatch && (
              <Divider
                style={{
                  width: "60%",
                  background: "#ffffff66",
                  marginTop: "5px",
                }}
              />
            )}
            <Grid xs={12} sm={4} item>
              <AvatarsControllers {...configAvatarControllers} />
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
