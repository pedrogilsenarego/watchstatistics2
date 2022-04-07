import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Typography,
  Paper,
  useMediaQuery,
  Button,
  useTheme,
  CardMedia,
} from "@mui/material";
import Select from "../../forms/SelectMUI";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import { BiCheckboxChecked, BiCheckbox } from "react-icons/bi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import watchTypes from "../../../assets/data/watchTypes.json";
import pricesBracket from "../../../assets/data/pricesBracket.json";
import watchBrands from "../../../assets/data/watchBrands.json";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  products: state.productsData.products,
  counters: state.productsData.counters,
});

// eslint-disable-next-line
const WatchesTable = () => {
  const dispatch = useDispatch();
  const [productCategory, setProductCategory] = useState(null);
  const [productPrices, setProductPrices] = useState(null);
  const [productBrands, setProductBrands] = useState(null);
  const [score, setScore] = useState("desc");
  const history = useHistory();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const pageSize = 10;

  const { products, currentUser } = useSelector(mapState);

  const { data, isLastPage, queryDoc } = products;

  const useStyles = makeStyles((theme) => ({
    tableRow: {
      "&:hover": {
        backgroundColor: "#858585 !important",
      },
    },
    table: {},
    tableHead: {
      backgroundColor: "#14587500 !important",
    },
  }));

  const classes = useStyles();

  const { userVotes } = currentUser ? currentUser : "null";

  useEffect(
    () => {
      dispatch(
        fetchProductsStart({
          pageSize,
          sort: score,
          productCategory,
          productPrices,
          productBrands,
        })
      );
    },
    // eslint-disable-next-line
    [score, productCategory, productPrices, productBrands]
  );

  const handleGoNext = () => {
    if (!isLastPage) {
      dispatch(
        fetchProductsStart({
          startAfterDoc: queryDoc,
          pageSize,
          productCategory,
          productPrices,
          productBrands,
          sort: score,
          persistProducts: data,
        })
      );
    }
  };
  const handleScore = () => {
    score === "desc" ? setScore("asc") : setScore("desc");
  };

  const handleFilterCategory = (e) => {
    setProductCategory(e.target.value);
  };

  const handleFilterPrices = (e) => {
    setProductPrices(e.target.value);
  };

  const handleFilterBrands = (e) => {
    setProductBrands(e.target.value);
  };

  const configCategory = {
    defaultValue: productCategory,
    options: watchTypes.options,
    handleChange: handleFilterCategory,
    label: "Categories",
  };

  const configPricesBracket = {
    defaultValue: productPrices,
    options: pricesBracket.options,
    handleChange: handleFilterPrices,
    label: "Prices Bracket",
  };

  const configBrands = {
    defaultValue: productBrands,
    options: watchBrands.options,
    handleChange: handleFilterBrands,
    label: "Brands",
  };

  return (
    <div>
      <Grid container spacing={1} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <Table
            aria-label="simple table"
            size="small"
            className={classes.table}
          >
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ fontSize: "15px", borderBottom: "none" }}
                >
                  <Select className={classes.select2} {...configBrands} />
                </TableCell>

                <TableCell
                  align="center"
                  style={{ fontSize: "15px", borderBottom: "none" }}
                >
                  <Select className={classes.select2} {...configCategory} />
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontSize: "15px", borderBottom: "none" }}
                >
                  <Select
                    className={classes.select2}
                    {...configPricesBracket}
                  />
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleScore();
                  }}
                  align="center"
                  style={{
                    fontSize: "15px",
                    color: "#ffffff66",
                    cursor: "pointer",
                    borderBottom: "none",
                  }}
                >
                  {score === "desc" && <AiOutlineArrowDown />}
                  {score === "asc" && <AiOutlineArrowUp />} Score
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "15px",
                    color: "#ffffff66",
                    borderBottom: "none",
                  }}
                >
                  Votes
                </TableCell>
                {currentUser && (
                  <TableCell
                    align="center"
                    style={{ fontSize: "15px", borderBottom: "none" }}
                  >
                    <BiCheckboxChecked color="#ffffff66" fontSize="1.5em" />
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length < 1 ? (
                <div>teste</div>
              ) : (
                data?.map((product, i) => {
                  const {
                    productName,
                    productBrand,
                    avgTotal,
                    productCategory,
                    numberVotesOwn,
                    numberVotesNotOwn,
                    productPriceBrackets,
                    documentID,
                    reference,
                  } = product;
                  if (!productName) return null;
                  const color = "#ffffffB3";

                  const colorRow = `linear-gradient(90deg, rgba(3, 10, 13, ${
                    avgTotal / 10
                  }) ${avgTotal * 10}%, rgb(25, 107, 145) 100%)`;
                  return (
                    <TableRow
                      className={classes.tableRow}
                      key={productName}
                      style={{
                        cursor: "pointer",
                        background: colorRow,
                      }}
                      onClick={() => history.push(`/product/${documentID}`)}
                    >
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        style={{ color: color, borderBottom: "none" }}
                      >
                        {productBrand} {productName} - {reference}
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{ color: color, borderBottom: "none" }}
                      >
                        {productCategory}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: color, borderBottom: "none" }}
                      >
                        {productPriceBrackets}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: color, borderBottom: "none" }}
                      >
                        {avgTotal}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: color, borderBottom: "none" }}
                      >
                        {numberVotesNotOwn + numberVotesOwn}
                      </TableCell>
                      {currentUser &&
                        currentUser.userVotes &&
                        userVotes.includes(documentID) && (
                          <TableCell
                            align="center"
                            style={{
                              color: color,
                              fontSize: "15px",
                              borderBottom: "none",
                            }}
                          >
                            <BiCheckboxChecked fontSize="1.5em" />
                          </TableCell>
                        )}
                      {currentUser && !userVotes.includes(documentID) && (
                        <TableCell
                          align="center"
                          style={{ color: color, fontSize: "15px" }}
                        >
                          <BiCheckbox fontSize="1.5em" />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {!isLastPage && (
            <Button onClick={() => handleGoNext()}>Get more</Button>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {data.length < 1 ? (
            <div>Teste</div>
          ) : (
            <Paper style={{ height: "100%", backgroundColor: "black" }}>
              <CardMedia
                style={{
                  height: isMatch ? "80vh" : "100%",
                  borderRadius: "4px",
                }}
                image={data[0].productThumbnail[0]}
              >
                <Grid container alignItems="center" justifyContent="center">
                  <Typography
                    style={{ color: "#ffffff66", paddingTop: "10px" }}
                  >
                    Check here the top voted watch
                  </Typography>
                </Grid>
              </CardMedia>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default WatchesTable;
