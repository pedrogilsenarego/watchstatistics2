import React, { useState } from "react";
import { Card, CardMedia, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  const [addAdditionalPictures, setAddAdditionalPictures] = useState(false);
  const useStyles = makeStyles((theme) => ({
    filter: {},

    media: {
      textAlign: "right",
      paddingTop: "70vh",
      paddingRight: "5px",
      borderRadius: "4px",
    },
  }));

  const classes = useStyles();

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

  return (
    <>
      {productThumbnail && (
        <Card style={{ backgroundColor: "#18161E" }}>
          <CardMedia
            className={classes.media}
            image={mainImage ? mainImage : productThumbnail[0]}
          />

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
