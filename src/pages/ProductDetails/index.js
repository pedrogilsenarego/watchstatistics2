import { useEffect, useState, useRef } from "react";
import SideGraphPanel from "../../containers/ProductDetails/ProductSideGraph";
import SideDescription from "../../containers/ProductDetails/ProductSideDescription";
import ProductSideList from "../../containers/ProductDetails/ProductSideList";
import MobileBottomAppBar from "src/containers/ProductDetails/MobileBottomAppBar";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import ImageMain from "../../containers/ProductDetails/ImageMain";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import {
  Typography,
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
} from "../../redux/Products/products.actions";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  product: state.productsData.product,
  cartItems: state.cartData.cartItems,
  cartBoosters: state.cartData.cartBoosters,
});

const NO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

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

  const [productThumbnail, setProductThumbnail] = useState([NO_IMAGE]);
  const [productCategory, setProductCategory] = useState("");
  const [productPriceBrackets, setProductPriceBrackets] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productName, setProductName] = useState("");

  const NEW_WATCH_INITIAL_VALUES = {
    productBrand: "",
    productName: "",
    reference: "",
    productThumbnail: [],
    productCategory: "",
    productPriceBrackets: "",
  };

  useEffect(
    () => {
      if (productID) {
        setNewWatch(false);
        dispatch(fetchProductStart(productID));
        if (
          cartItems.length > 3 ||
          cartItems.some((e) => e.reference === reference)
        ) {
          setCompareWatches(true);
        }
      } else {
        setNewWatch(true);
      }
    },
    // eslint-disable-next-line
    [productID]
  );

  useEffect(() => {
    if (productID) {
      setProductThumbnail(product.productThumbnail);
      setProductCategory(product.productCategory);
      setProductPriceBrackets(product.productPriceBrackets);
      setProductBrand(product.productBrand);
      setProductName(product.productName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const { reference, avgTotal } = product;

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
    showVote,
    setShowVote,
    voteRef,
    currentUser,
    newWatch,
    setProductThumbnail,
  };

  const configProductSideList = {
    productCategory,
    newWatch,
    setProductCategory,
    productPriceBrackets,
    setProductPriceBrackets,
    productBrand,
    setProductBrand,
    productName,
    setProductName,
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
              <Box sx={{ borderRadius: "10px" }}>
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
              style={{ marginTop: "120px" }}
            >
              <Typography
                variant='h6'
                style={{
                  color: "#ffffff66",
                  paddingLeft: "10px",
                }}
              >
                {productBrand} {productName} - {reference}
              </Typography>
              <Box
                sx={{ borderRadius: "10px" }}
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
                        <ProductSideList {...configProductSideList} />
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
