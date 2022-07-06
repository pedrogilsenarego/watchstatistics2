import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { fetchProductsStart } from "../../../../redux/Products/products.actions";
import Item from "./Item";

const mapState = (state) => ({
  products: state.productsData.products,
});

const Display = ({ isMatch }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  const { data } = products;

  const pageSize = 4;
  const filterType = "Divers";
  const filter = "productCategory";

  useEffect(
    () => {
      dispatch(fetchProductsStart({ pageSize, filterType, filter }));
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Grid
      container
      spacing={1}
      style={{ paddingTop: isMatch ? "2vh" : "20vh" }}
    >
      {data &&
        data.map((item, pos) => {
          const configItem = { item, pos, filter, filterType };
          return <Item key={pos} {...configItem} />;
        })}
    </Grid>
  );
};

export default Display;
