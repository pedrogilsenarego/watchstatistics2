import React, { useEffect, useState } from "react";
import SideGraphPanel from "../../containers/ProductDetails/ProductSideGraph";
import SideDescription from "../../containers/ProductDetails/ProductSideDescription";
import ProductSideList from "../../containers/ProductDetails/ProductSideList";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector } from "react-redux";
import { Parallax } from "react-parallax";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import ImageMain from "../../containers/ProductDetails/ImageMain";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Container from "@mui/material/Container";

import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";
import { useDispatch } from "react-redux";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  product: state.productsData.product,
  cartItems: state.cartData.cartItems,
  cartBoosters: state.cartData.cartBoosters,
});

// eslint-disable-next-line
const ProductDetails = ({}) => {
  const dispatch = useDispatch();
  const { productID } = useParams();

  const { product, currentUser, cartItems } = useSelector(mapState);

  const [compareWatches, setCompareWatches] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const useStyles = makeStyles((theme) => ({
    filter: {},

    side: {},
  }));

  const classes = useStyles();

  useEffect(
    () => {
      dispatch(fetchProductStart(productID));
      if (
        cartItems.length > 3 ||
        cartItems.some((e) => e.reference === reference)
      )
        setCompareWatches(true);
      return () => {
        dispatch(setProduct({}));
      };
    },
    // eslint-disable-next-line
    []
  );

  const {
    productThumbnail,
    productName,
    productBackground,
    productBrand,
    reference,
    avgTotal,
  } = product;

  const bgImage = () => {
    if (!currentUser) return;

    if (currentUser.backgroundImageOff) {
      if (productBackground) return productBackground;
    } else return;
  };

  if (!productThumbnail || !productName) return null;

  const configImageMain = {
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
  };

  return (
    <div>
      <Helmet>
        <meta property="og:image" content={productThumbnail} />
      </Helmet>

      <Container
        disableGutters={isMatch ? true : false}
        style={{ marginTop: "40px" }}
      >
        <Typography
          style={{ marginTop: "90px", color: "#ffffff66", marginLeft: "10px" }}
          variant="h6"
        >
          {productBrand} {productName} - {reference}
        </Typography>
        <Parallax bgImage={bgImage()} strength={300}>
          <Box
            sx={{ borderRadius: "10px" }}
            className={classes.filter}
            height={"100%"}
            style={{
              position: "relative",
            }}
          >
            <Grid
              container
              spacing={1}
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <Grid item xs={12} md={7}>
                <ImageMain {...configImageMain} />
                <Card style={{ backgroundColor: "#18161E", marginTop: "8px" }}>
                  <SideDescription />
                </Card>
              </Grid>
              <Grid item xs={12} md={5}>
                <SideGraphPanel isMatch={isMatch} />

                <Card
                  style={{
                    backgroundColor: "#18161E",
                    marginTop: "8px",
                    padding: "5px",
                  }}
                >
                  <CardContent style={{ padding: "5px" }}>
                    <ProductSideList />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Parallax>
      </Container>
    </div>
  );
};

export default ProductDetails;
