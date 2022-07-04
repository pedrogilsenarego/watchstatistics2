import { useEffect, useState, lazy } from "react";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { fetchMyCollectionStart } from "../../redux/Products/products.actions";
import { bagSizeHelper } from "src/Utils/gamyfication";
import TopHeader from "src/components/TopHeader";
import { menuButtons, topHeaderRightEntries } from "./constants";
import { Redux } from "src/redux/types";

import Item from "./Item";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
  products: state.productsData.myCollection,
});

const MyCollection = () => {
  const { currentUser, products } = useSelector(mapState);
  const [tab, setTab] = useState("myWatches");
  const dispatch = useDispatch();

  const GoodiesList = lazy(() => import("./GoodiesList"));

  const myCollection = currentUser?.collection || [];

  useEffect(
    () => {
      dispatch(fetchMyCollectionStart({ myCollection }));
    },
    // eslint-disable-next-line
    []
  );

  const renderMyWatches = () => {
    return (
      <Grid
        item
        container
        rowGap={2}
        spacing={1}
        xs={12}
        style={{ marginTop: "20px" }}
      >
        {currentUser.collection &&
          products?.map((item: any, pos: number) => {
            const configItem = { item, products };
            return <Item key={pos} {...configItem} />;
          })}
      </Grid>
    );
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <TopHeader
        listButtons={menuButtons(setTab)}
        rightEntries={topHeaderRightEntries(tab,
          `${currentUser.collection?.length || 0}/${bagSizeHelper(
            currentUser?.experience || 0
          )}`, `${currentUser.watchParts?.length || 0}/${bagSizeHelper(
            currentUser?.experience || 0
          )}`
        )}
      />
      <Container>
        {tab === "myWatches" && renderMyWatches()}
        {tab === "goodies" && <GoodiesList parts={currentUser?.watchParts || []} />}
      </Container>
    </Container>
  );
};

export default MyCollection;
