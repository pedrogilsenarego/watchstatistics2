import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TableList from "src/components/TableList";
import { tableColumns, topHeaderButtons, topHeaderRightEntries } from "./constants";
import { mapMarketItems } from "./mapper";
import { bagSizeHelper } from "src/Utils/gamyfication";
import * as GeneralStyled from "src/styles/styles";
import useMarket from "./useMarket";
import TopHeader from "src/components/TopHeader"

const Market = () => {
  const { handleAction, bagFull, funds, marketData, currentUser } = useMarket();

  return (
    <Container disableGutters style={{ marginTop: "100px" }}>
      <TopHeader listButtons={topHeaderButtons} rightEntries={topHeaderRightEntries} />
      <Grid
        container
        xs={12}
        style={{ backgroundColor: "#154A6799", padding: "5px" }}
      >
        <Container>
          <Grid container alignItems='center'
            justifyContent='space-between'>
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
        </Container>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "20px" }}>
        <Container>
          <TableList
            columns={tableColumns}
            rows={mapMarketItems(marketData, bagFull(), funds).rows}
            onAction={handleAction}
          />
        </Container>
      </Grid>

    </Container>
  );
};

export default Market;
