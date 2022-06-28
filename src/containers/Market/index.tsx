import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TableList from "src/components/TableList";
import {
  tableColumns,
  topHeaderButtons,
  topHeaderRightEntries,
} from "./constants";
import { mapMarketItems } from "./mapper";
import { bagSizeHelper } from "src/Utils/gamyfication";
import useMarket from "./useMarket";
import TopHeader from "src/components/TopHeader";

const Market = () => {
  const { handleAction, bagFull, funds, marketData, currentUser } = useMarket();

  return (
    <Container disableGutters style={{ marginTop: "100px" }}>
      <TopHeader
        listButtons={topHeaderButtons}
        rightEntries={topHeaderRightEntries(
          currentUser.points || 0,
          `${currentUser.collection?.length || 0}/${bagSizeHelper(
            currentUser?.experience || 0
          )}`
        )}
      />
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
