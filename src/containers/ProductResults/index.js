import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product";
import FormSelect from "../forms/SelectMUI";
import LoadMore from "../LoadMore";
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import watchTypes from "../../assets/data/watchTypes.json";
import watchBrands from "../../assets/data/watchBrands.json";
import pricesBracket from "../../assets/data/pricesBracket.json";
import { makeStyles } from "@material-ui/core/styles";

import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});
// eslint-disable-next-line
const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const [filter, setFilter] = useState("productCategory");

  const [stateButtonSearch, setStateButtonSearch] = useState(true);
  const [state, setState] = React.useState({
    left: false,
  });

  const [productBrandFilter, setProductBrandFilter] = useState(false);
  const [productCategoryFilter, setProductCategoryFilter] = useState(false);
  const [productPriceFilter, setProductPriceFilter] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollGap, setScrollGap] = useState(0);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const pageSize = isMatch ? 3 : 12;

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  useEffect(
    () => {
      if (scrollY - scrollGap >= 50) {
        setScrollGap(scrollGap + 50);
        handleLoadMore();
      }
    },
    // eslint-disable-next-line
    [scrollY]
  );

  const useStyles = makeStyles((theme) => ({
    main: {
      paddingTop: "10px",
    },
    drawer: {
      "& .MuiPaper-root": {
        backgroundColor: "#ffffffE3",
        color: "#ffffffB3",
      },
    },
    filterButton: {
      height: "3.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    filters: {
      backgroundColor: "#196B91",
      color: "#ffffff",
      padding: "2px",
    },
    select2: {
      backgroundColor: "#134F6B",
    },
    textField: {
      "& .MuiOutlinedInput-input": { color: "white" },
      "& . MuiInputLabel-root": {
        color: "#ffffffB3",
      },
      "& .MuiInputLabel-root": { color: "#ffffffB3" },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ffffffB3",
        borderWidth: "2px",
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#FFA500",
      },
      "&:hover .MuiInputLabel-root": { color: "#ffffff" },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ffffffB3",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#ffffffB3",
      },
      "& .MuiInputLabel-root.Mui-focused": { color: "#ffffffB3" },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ffffffB3",
      },
    },
  }));
  const classes = useStyles();

  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setStateButtonSearch(!stateButtonSearch);
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === "top" || anchor === "bottom"
            ? "auto"
            : isMatch
            ? "100vw"
            : 400,
      }}
      /* onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)} */
    >
      <Grid
        container
        direction="row"
        style={{ display: "flex", paddingTop: "160px" }}
      >
        <Grid
          container
          xs={12}
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "10px",
          }}
        >
          <Grid item xs={9}>
            <FormSelect className={classes.select2} {...configFilters} />
          </Grid>
          <Grid item xs={9}>
            <FormSelect className={classes.select2} {...configFilterBrands} />
          </Grid>
          <Grid item xs={9}>
            <FormSelect
              className={classes.select2}
              {...configFilterPriceBrackets}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  useEffect(
    () => {
      dispatch(fetchProductsStart({ filterType, filter, pageSize }));
    },
    // eslint-disable-next-line
    [filterType]
  );

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    setFilter("productCategory");

    setProductCategoryFilter(e.target.value);
    history.push(`/search/${nextFilter}`);
  };

  const handleFilterBrand = (e) => {
    const nextFilter = e.target.value;
    setFilter("productBrand");

    setProductBrandFilter(e.target.value);
    history.push(`/search/${nextFilter}`);
  };

  const handleFilterPriceBracket = (e) => {
    const nextFilter = e.target.value;

    setFilter("productPriceBrackets");
    setProductPriceFilter(e.target.value);
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;

  const configFilters = {
    defaultValue: filterType,
    options: watchTypes.options,
    handleChange: handleFilter,
    label: "Categories",
  };

  const configFilterBrands = {
    defaultValue: filterType,
    options: watchBrands.options,
    handleChange: handleFilterBrand,
    label: "Brands",
  };

  const configFilterPriceBrackets = {
    defaultValue: filterType,
    options: pricesBracket.options,
    handleChange: handleFilterPriceBracket,
    label: "PriceBrackets",
  };

  const handleLoadMore = () => {
    if (!isLastPage) {
      dispatch(
        fetchProductsStart({
          filterType,
          startAfterDoc: queryDoc,
          persistProducts: data,
          pageSize: isMatch ? 2 : 4,
        })
      );
    }
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  if (data.length < 1) {
    return (
      <div style={{ paddingTop: "50px" }}>
        <div>
          {["left"].map((anchor) => (
            <div key={anchor}>
              {stateButtonSearch && (
                <Button
                  className={classes.filterButton}
                  style={{
                    marginTop: "80vh",
                    marginLeft: "3px",
                    position: "fixed",
                    zIndex: "3",
                    color: "white",
                    backgroundColor: "#ffffff40",
                  }}
                  onClick={toggleDrawer(anchor, true)}
                >
                  <FiSearch fontSize="2em" />
                </Button>
              )}

              <Drawer
                BackdropProps={{ invisible: true }}
                className={classes.drawer}
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div layout>
      <div>
        {["left"].map((anchor) => (
          <div key={anchor}>
            {stateButtonSearch && (
              <Button
                className={classes.filterButton}
                style={{
                  marginTop: "80vh",
                  marginLeft: "3px",
                  position: "fixed",
                  zIndex: "3",
                  color: "white",
                  backgroundColor: "#ffffff40",
                }}
                onClick={toggleDrawer(anchor, true)}
              >
                <FiSearch fontSize="2em" />
              </Button>
            )}

            <Drawer
              BackdropProps={{ invisible: true }}
              className={classes.drawer}
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </div>
        ))}
      </div>

      <Grid container spacing={1} className={classes.main}>
        {data.map((product, pos) => {
          const {
            productThumbnail,
            productName,
            productBrand,
            productCategory,
            productPriceBrackets,
          } = product;
          if (!productThumbnail || !productName) return null;
          if (
            (productCategoryFilter &&
              productCategoryFilter !== productCategory) ||
            (productBrandFilter && productBrandFilter !== productBrand) ||
            (productPriceFilter && productPriceFilter !== productPriceBrackets)
          )
            return null;
          const configProduct = {
            ...product,
          };

          return (
            <Grid item xs="12" sm="6" md="3">
              <motion.div layout>
                <Product {...configProduct} />
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </motion.div>
  );
};

export default ProductResults;
