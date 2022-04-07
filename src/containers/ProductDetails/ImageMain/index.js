import React, { useState } from "react";
import { Card, CardMedia, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarsControllers from "../AvatarsControllers2";
import Divider from "@mui/material/Divider";
import { useTheme } from "@material-ui/core";

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
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    filter: {},

    media: {
      textAlign: "right",
      paddingTop: "70vh",
      paddingRight: "5px",
      borderRadius: "4px",
    },

    textBtn: {
      color: "#ffffff",
      fontSize: "13px",

      "&:hover": {
        color: "#FFA500",
      },
      "&:active": {
        color: "#FFFFFF",
      },
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

          <Grid container alignItems="center" justifyContent="center">
            <Grid xs={12} sm={8} item>
              {productThumbnail.map((item, pos) => {
                return (
                  <IconButton
                    key={pos}
                    className={classes.textBtn}
                    onClick={(e) => {
                      setMainImage(item);
                    }}
                  >
                    <CardMedia
                      style={{
                        cursor: "pointer",
                        border:
                          mainImage === item ? "solid 1.5px" : "solid 0px",
                        borderRadius: "2px",
                        borderColor: mainImage === item ? "orange" : "ffffff00",
                      }}
                      component="img"
                      height="50px"
                      image={item}
                      alt=""
                    />
                  </IconButton>
                );
              })}
            </Grid>
            {isMatch && (
              <Divider
                style={{
                  width: "60%",
                  background: theme.palette.text.faded3,
                  marginTop: "5px",
                }}
              />
            )}
            <Grid xs={12} sm={4} item>
              <AvatarsControllers {...configAvatarControllers} />
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default ImageMain;
