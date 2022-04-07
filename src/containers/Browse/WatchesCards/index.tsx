import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import { Grid } from "@mui/material";
import WatchCard from "./WatchCard";
import * as Styled from "./styles";
import Menu from "./Menu";

const mapState = (state: any) => ({
  currentUser: state.user.currentUser,
  products: state.productsData.products,
});

const WatchesCards = () => {
  const dispatch = useDispatch();
  const { products, currentUser } = useSelector(mapState);
  const { data, isLastPage, queryDoc } = products;
  const [productCategory, setProductCategory] = useState<null | string>(null);
  const [productPrices, setProductPrices] = useState(null);
  const [productBrands, setProductBrands] = useState<null | string>(null);
  const [score, setScore] = useState("desc");
  const pageSize = 5;

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

  const configWatchCard = {
    currentUser,
    setProductBrands,
    setProductCategory,
    pCategory: productCategory,
    productPrices,
    setProductPrices,
  };

  const configMenu = {
    setProductBrands,
    productBrands,
    setProductCategory,
    productCategory,
    productPrices,
    setProductPrices,
    score,
    setScore,
  };

  return (
    <Styled.Grid container>
      <Grid item xs={12}>
        <Menu {...configMenu} />
      </Grid>
      <Grid item container rowSpacing={1} xs={12}>
        {data?.map((watchData: any, index: number) => {
          return (
            <WatchCard key={index} data={watchData} {...configWatchCard} />
          );
        })}
      </Grid>
    </Styled.Grid>
  );
};

export default WatchesCards;
