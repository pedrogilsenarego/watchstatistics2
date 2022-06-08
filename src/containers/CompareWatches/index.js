import RadarChart from "../RadarChart";
import * as GeneralStyled from "src/styles/styles";
import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapCartItems } from "./mapper";
import useCompareWatches from "./useCompareWatches";
import { Grid, Container, Paper, Typography } from "@mui/material";
import Button3 from "src/components/Buttons/Button3";

const CompareWatches = () => {
  const {
    handleAction,
    handleClearCart,
    cartItems,
    history,
    mobile,
    configRadarChart,
  } = useCompareWatches();

  return (
    <Container
      disableGutters={mobile ? true : false}
      style={{ marginTop: "100px" }}
    >
      <Grid
        container
        spacing={2}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      >
        <Grid item xs={12} md={7}>
          <GeneralStyled.Card>
            {cartItems && cartItems.length > 0 && (
              <TableList
                columns={tableColumns}
                rows={mapCartItems(cartItems).rows}
                onAction={handleAction}
              />
            )}

            <Grid
              container
              columnGap={2}
              justifyContent='end'
              style={{ marginTop: "20px" }}
            >
              <Grid item>
                <Button3
                  title='Search for Watches'
                  onClick={() => {
                    history.push("/browse");
                  }}
                />
              </Grid>
              <Grid item>
                <Button3
                  onClick={() => {
                    handleClearCart();
                  }}
                  title='Clear Watches'
                />
              </Grid>
            </Grid>
          </GeneralStyled.Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper style={{ background: "#18161E" }}>
            <RadarChart {...configRadarChart} />
            <Typography>
              Weighted average from the votes of owners VS non-owners
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompareWatches;
