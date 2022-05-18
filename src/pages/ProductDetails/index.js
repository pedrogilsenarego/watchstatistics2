import { useEffect, useState, useRef } from "react";
import SideGraphPanel from "../../containers/ProductDetails/ProductSideGraph";
import SideDescription from "../../containers/ProductDetails/ProductSideDescription";
import ProductSideList from "../../containers/ProductDetails/ProductSideList";
import { makeStyles } from "@material-ui/core/styles";
import MobileBottomAppBar from "src/containers/ProductDetails/MobileBottomAppBar";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import ImageMain from "../../containers/ProductDetails/ImageMain";
import WatchName from "src/containers/ProductDetails/WatchName";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import {
  Grid,
  Card,
  CardContent,
  Box,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import Container from "@mui/material/Container";

import {
  fetchProductStart,
  addProductStart,
  setProduct,
} from "../../redux/Products/products.actions";

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
  const [showVote, setShowVote] = useState(false);
  const [newWatch, setNewWatch] = useState(false);
  const [compareWatches, setCompareWatches] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const voteRef = useRef();

  const NEW_WATCH_INITIAL_VALUES = {
    productBrand: "",
    productName: "",
  };

  const NO_IMAGE =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

  const useStyles = makeStyles((theme) => ({
    filter: {},

    side: {},
  }));

  const classes = useStyles();

  useEffect(
    () => {
      if (productID) {
        setNewWatch(false);
        dispatch(fetchProductStart(productID));
        if (
          cartItems.length > 3 ||
          cartItems.some((e) => e.reference === reference)
        )
          setCompareWatches(true);
        return () => {
          dispatch(setProduct({}));
        };
      } else setNewWatch(true);
    },
    // eslint-disable-next-line
    [productID]
  );

  const { productThumbnail, productName, productBrand, reference, avgTotal } =
    product;

  if (!productThumbnail || !productName) return null;

  const configImageMain = {
    isMatch,
    productThumbnail: newWatch ? [NO_IMAGE] : productThumbnail,
    product,
    cartItems,
    productID,
    productBrand,
    productName,
    reference,
    avgTotal,
    compareWatches,
    showVote,
    setShowVote,
    voteRef,
    currentUser,
    newWatch,
  };

  const handleSubmitNewWatch = (values) => {
    dispatch(
      addProductStart({
        ...values,
        currentUser,
        userID: currentUser.displayName,
        UserUID: currentUser.id,
      })
    );
  };

  return (
    <div>
      <Helmet>
        <meta property='og:image' content={productThumbnail[0]} />
      </Helmet>
      <Formik
        initialValues={NEW_WATCH_INITIAL_VALUES}
        onSubmit={(values) => handleSubmitNewWatch(values)}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          {isMatch ? (
            <>
              <Box sx={{ borderRadius: "10px" }} className={classes.filter}>
                <Grid
                  container
                  spacing={1}
                  style={{
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  <Grid item xs={12}>
                    <ImageMain {...configImageMain} />

                    <Grid
                      item
                      xs={12}
                      md={5}
                      style={{ marginTop: isMatch ? "8px" : "0px" }}
                    >
                      <SideGraphPanel
                        isMatch={isMatch}
                        showVote={showVote}
                        setShowVote={setShowVote}
                      />

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
                    <Card
                      style={{ backgroundColor: "#18161E", marginTop: "8px" }}
                    >
                      <SideDescription />
                    </Card>
                  </Grid>
                </Grid>{" "}
              </Box>
              <MobileBottomAppBar {...configImageMain} />
            </>
          ) : (
            <Container
              disableGutters={isMatch ? true : false}
              style={{ marginTop: "130px" }}
            >
              <WatchName newWatch={newWatch} />
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
                    <Card
                      style={{ backgroundColor: "#18161E", marginTop: "8px" }}
                    >
                      <SideDescription />
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <SideGraphPanel
                      newWatch={newWatch}
                      isMatch={isMatch}
                      showVote={showVote}
                      setShowVote={setShowVote}
                      voteRef={voteRef}
                    />

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
                </Grid>{" "}
              </Box>
            </Container>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default ProductDetails;
