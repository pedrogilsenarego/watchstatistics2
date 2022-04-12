import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import WatchCard from "./WatchCard";
import * as Styled from "./styles";
import Menu from "./Menu";
import Button1 from "../../../components/Buttons/Button1";

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
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleLoadMore = () => {
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
    <Styled.Grid mobile={isMatch} container>
      <Grid item xs={12}>
        <Menu {...configMenu} />
      </Grid>
      <Grid item container style={{ marginTop: "10px" }} rowSpacing={1} xs={12}>
        {data?.map((watchData: any, index: number) => {
          return (
            <WatchCard key={index} data={watchData} {...configWatchCard} />
          );
        })}
      </Grid>
      <Styled.ButtonGrid container justifyContent="center" item xs={12}>
        <Button1 title="Load More" onClick={handleLoadMore} />
      </Styled.ButtonGrid>
    </Styled.Grid>
  );
};

export default WatchesCards;
