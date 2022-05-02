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
import Button1 from "src/components/Buttons/Button1";
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
      <>
        <p>No search Results</p>
        <Button1 title='Get All Watches' onClick={() => handleGetWatches()} />

        {watchProducts.map((item, pos) => {
          return (
            <Typography style={{ color: "white" }} key={pos}>
              &#123;"name":"{item.productBrand} {item.productName}{" "}
              {item.reference}", "id": "{item.documentID}"&#125;,
            </Typography>
          );
        })}
      </>
    );
  }

  return (
    <div>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            style={{ marginTop: "10px", backgroundColor: "#ffffff" }}
          >
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ fontSize: "15px" }}>
                    #
                  </TableCell>
                  <TableCell align='center' style={{ fontSize: "15px" }}>
                    Watches
                  </TableCell>
                  <TableCell align='center' style={{ fontSize: "15px" }}>
                    Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((product, i) => {
                  const { productID, productReference, type } = product;
                  product.admin = true;
                  const color = "#000000";
                  return (
                    <TableRow
                      key={i}
                      style={{ cursor: "pointer" }}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align='center' style={{ color: color }}>
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align='center'
                        component='th'
                        scope='row'
                        style={{ color: color }}
                        onClick={() => history.push(`/product/${productID}`)}
                      >
                        {productReference}
                      </TableCell>

                      <TableCell align='center' style={{ color: color }}>
                        <ButtonGroup>
                          {type === "newWatch" && (
                            <Button
                              onClick={() => {
                                delete product.documentID;
                                dispatch(addProductStart(product));
                                dispatch(deleteProductStart(productID));
                              }}
                            >
                              Approve New Watch
                            </Button>
                          )}
                          {type !== "newWatch" && (
                            <Button
                              onClick={() => {
                                dispatch(updateProductDetailsStart(product));
                                dispatch(deleteProductStart(productID));
                              }}
                            >
                              Approve Update Watch
                            </Button>
                          )}
                          <Button
                            onClick={() =>
                              dispatch(deleteProductStart(productID))
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
      <Button1 title='Get All Watches' onClick={() => handleGetWatches()} />
    </div>
  );
};

export default Admin;
