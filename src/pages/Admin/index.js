import React, { useEffect } from "react";
import { useHistory } from "react-router";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Paper,
  Button,
  Typography,
  ButtonGroup,
} from "@material-ui/core";

import { fetchAllProductsStart } from "../../redux/Products/products.actions";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchValidationProductsStart,
  addProductStart,
  deleteProductStart,
  updateProductDetailsStart,
} from "../../redux/Products/products.actions";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  products: state.productsData.validationProducts,
  watchProducts: state.productsData.products.data,
});

// eslint-disable-next-line
const Admin = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pageSize = 5;

  const { products, watchProducts } = useSelector(mapState);

  const { data } = products;

  const handleGetWatches = () => {
    dispatch(fetchAllProductsStart());
  };

  useEffect(
    () => {
      dispatch(fetchValidationProductsStart({ pageSize }));
    },
    // eslint-disable-next-line
    []
  );

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div>
        <p>No search Results</p>
        <Button onClick={() => handleGetWatches()}>Get Watches</Button>

        {watchProducts.map((item, pos) => {
          return (
            <Typography style={{ color: "white" }} key={pos}>
              &#123;"name":"{item.productBrand} {item.productName}{" "}
              {item.reference}", "id": "{item.documentID}"&#125;,
            </Typography>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            style={{ marginTop: "10px", backgroundColor: "#000000" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontSize: "15px" }}>
                    #
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "15px" }}>
                    Watches
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "15px" }}>
                    Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((product, i) => {
                  const { productName, productBrand, documentID, productDesc } =
                    product;
                  product.admin = true;
                  if (!productName) return null;
                  const color = "#ffffff";
                  return (
                    <TableRow
                      key={productName}
                      style={{ cursor: "pointer" }}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" style={{ color: color }}>
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        style={{ color: color }}
                        onClick={() => history.push(`/product/${documentID}`)}
                      >
                        {productBrand} - {productName}
                      </TableCell>

                      <TableCell align="center" style={{ color: color }}>
                        <ButtonGroup>
                          {productDesc && (
                            <Button
                              onClick={() => {
                                delete product.documentID;
                                dispatch(addProductStart(product));
                                dispatch(deleteProductStart(documentID));
                              }}
                            >
                              Approve New Watch
                            </Button>
                          )}
                          {!productDesc && (
                            <Button
                              onClick={() => {
                                dispatch(updateProductDetailsStart(product));
                                dispatch(deleteProductStart(documentID));
                              }}
                            >
                              Approve Update Watch
                            </Button>
                          )}
                          <Button
                            onClick={() =>
                              dispatch(deleteProductStart(documentID))
                            }
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Button>Get Watches collection</Button>
    </div>
  );
};

export default Admin;
