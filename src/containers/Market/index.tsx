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
import { mapMarketItems } from "./mapper";
import { bagSizeHelper } from "src/Utils/gamyfication";
import * as GeneralStyled from "src/styles/styles";

const mapState = (state: Redux) => ({
  marketData: state.marketData.marketProducts,
  currentUser: state.user.currentUser,
});

const Market = () => {
  const { marketData, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketProductsStart({}));
    // eslint-disable-next-line
  }, []);

  const handleAction = (type: string, id: number) => {
    switch (type) {
      case "buy": {
        console.log("buy");
        //handleRemoveCartItem(cartItems[id].reference);
        break;
      }
      default:
        break;
    }
  };

  const bagFull = () => {
    if (currentUser.collection.length || 0 >= bagSizeHelper(currentUser.experience || 0))
      return true;
    else return false
  };

  const funds = currentUser.points || 0

  return (
    <Container>
      <Grid
        container
        spacing={2}
        rowGap={3}
        style={{ marginTop: "100px" }}
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          item
          container
          alignItems='center'
          justifyContent='space-between'
          xs={12}
          style={{ backgroundColor: "#154A6799" }}
        >
          <Grid item>
            <Button style={{ color: "white" }}>Market</Button>
          </Grid>
          <Grid item>
            <GeneralStyled.BasicTypography fontSize='14px'>
              Collection: {currentUser.collection?.length || 0}/
              {bagSizeHelper(currentUser?.experience || 0)}
            </GeneralStyled.BasicTypography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableList
            columns={tableColumns}
            rows={mapMarketItems(marketData, bagFull(), funds).rows}
            onAction={handleAction}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Market;
