import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { fetchMarketProductsStart } from "../../redux/Market/market.actions";
import { Redux } from "src/redux/types";
import Item from "./Item";
import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapMarketItems } from "./mapper"
import { bagSizeHelper } from "src/Utils/gamyfication";

const mapState = (state: Redux) => ({
  marketData: state.marketData.marketProducts,
  currentUser: state.user.currentUser
});

const Market = () => {
  const { marketData, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketProductsStart({}));
    // eslint-disable-next-line
  }, []);

  const handleAction = () => {

  }

  return (
    <Container >
      <Grid
        container
        spacing={2}
        style={{ marginTop: "100px" }}
        justifyContent="center"
      >
        <Grid item xs={12} style={{ backgroundColor: "#154A6799" }}>
          <Button style={{ color: "white" }}>Market</Button>
          <Button style={{ float: "right" }}>
            Collection: {currentUser.collection?.length || 0}/{bagSizeHelper(currentUser?.experience || 0)}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableList
            columns={tableColumns}
            rows={mapMarketItems(marketData).rows}
            onAction={handleAction} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Market;
