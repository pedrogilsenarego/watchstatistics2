import RadarChart from "../RadarChart";
import * as GeneralStyled from "src/styles/styles";
import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapCartItems } from "./mapper";
import useCompareWatches from "./useCompareWatches";
import { Grid, Container } from "@mui/material";
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
            <GeneralStyled.BasicTypography>
              CompareWatches
            </GeneralStyled.BasicTypography>
            {cartItems?.length > 0 ? (
              <TableList
                columns={tableColumns}
                rows={mapCartItems(cartItems).rows}
                onAction={handleAction}
              />
            ) : (
              <GeneralStyled.BasicTypography fontSize='16px'>
                You got no watches added to the compare system yet, go search
                for them.
              </GeneralStyled.BasicTypography>
            )}

            <Grid
              container
              columnGap={2}
              justifyContent='end'
              style={{ marginTop: "20px" }}
            >
              {cartItems?.length < 4 && (
                <Grid item>
                  <Button3
                    title='Search for Watches'
                    onClick={() => {
                      history.push("/browse");
                    }}
                  />
                </Grid>
              )}

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
        <Grid item xs={12} md={5} textAlign='center'>
          <GeneralStyled.Card>
            <RadarChart {...configRadarChart} />
            <GeneralStyled.BasicTypography
              fontSize='14px'
              style={{ marginTop: "10px" }}
            >
              Weighted average from the votes of owners VS non-owners
            </GeneralStyled.BasicTypography>
          </GeneralStyled.Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompareWatches;
