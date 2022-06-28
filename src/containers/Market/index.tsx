import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapMarketItems } from "./mapper";
import { bagSizeHelper } from "src/Utils/gamyfication";
import * as GeneralStyled from "src/styles/styles";
import useMarket from "./useMarket";

const Market = () => {
  const { handleAction, bagFull, funds, marketData, currentUser } = useMarket();

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
              <b>Funds:</b> {currentUser.points || 0} | <b>Collection:</b>{" "}
              {currentUser.collection?.length || 0}/
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
