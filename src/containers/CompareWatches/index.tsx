import RadarChart from "../RadarChart";
import * as GeneralStyled from "src/styles/styles";
import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapCartItems } from "./mapper";
import useCompareWatches from "./useCompareWatches";
import { Grid } from "@mui/material";
import Button3 from "src/components/Buttons/Button3";
import { i18n } from "src/translations/i18n";
import { generalEndpoints } from "src/constants/endpoints";
import * as Styled from "./styles";

const CompareWatches = () => {
  const {
    handleAction,
    handleClearCart,
    cartItems,
    history,
    mobile,
    configRadarChart,
    showClearWatches,
    showSearchWatches,
  } = useCompareWatches();

  return (
    <Styled.Container
      disableGutters={mobile ? true : false}
      mobile={mobile}
    >
      <Styled.MainGrid container spacing={2}>
        <Grid item xs={12} md={7}>
          <GeneralStyled.Card>
            <GeneralStyled.BasicTypography>
              {i18n.t("text.compareWatches.title")}
            </GeneralStyled.BasicTypography>
            {showClearWatches() ? (
              <TableList
                columns={tableColumns}
                rows={mapCartItems(cartItems).rows}
                onAction={handleAction}
              />
            ) : (
              <GeneralStyled.BasicTypography fontSize='16px'>
                {i18n.t("text.compareWatches.noWatches")}
              </GeneralStyled.BasicTypography>
            )}

            <Grid
              container
              columnGap={2}
              justifyContent={mobile ? "center" : "end"}
              style={{ marginTop: "20px" }}
            >
              {showSearchWatches() && (
                <Grid item>
                  <Button3
                    title={i18n.t("buttons.compareWatches.searchWatches")}
                    onClick={() => {
                      history.push(generalEndpoints.BROWSE);
                    }}
                  />
                </Grid>
              )}
              {showClearWatches() && (
                <Grid item>
                  <Button3
                    onClick={() => {
                      handleClearCart();
                    }}
                    title={i18n.t("buttons.compareWatches.clearWatches")}
                  />
                </Grid>
              )}
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
              {i18n.t("text.compareWatches.graphDescription")}
            </GeneralStyled.BasicTypography>
          </GeneralStyled.Card>
        </Grid>
      </Styled.MainGrid>
    </Styled.Container>
  );
};

export default CompareWatches;
