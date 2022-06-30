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
import HelpPopup from "./HelpPopup";
import { BsQuestionCircle } from "react-icons/bs"

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
    openPopup,
    setOpenPopup
  } = useCompareWatches();

  return (
    <>
      <HelpPopup open={openPopup} setOpen={setOpenPopup} />
      <Styled.Container disableGutters={mobile ? true : false} mobile={mobile}>
        <Styled.MainGrid container spacing={2}>
          <Grid item xs={12} md={7}>
            <GeneralStyled.Card>
              <GeneralStyled.TitleTypography>
                {i18n.t("text.compareWatches.title")}
              </GeneralStyled.TitleTypography>
              {showClearWatches() ? (
                <TableList
                  columns={tableColumns}
                  rows={mapCartItems(cartItems).rows}
                  onAction={handleAction}
                />
              ) : (
                <Grid container columnGap={1} style={{ marginTop: "20px", marginBottom: mobile ? "30px" : "100px" }}>
                  <GeneralStyled.BasicTypography fontSize='16px'>
                    {i18n.t("text.compareWatches.noWatches")}
                  </GeneralStyled.BasicTypography>
                  <BsQuestionCircle size="1.5em" color="orange" style={{ cursor: "pointer" }} onClick={() => setOpenPopup(true)} />
                </Grid>
              )}

              <Styled.ButtonGrid
                container
                columnGap={2}
                justifyContent={mobile ? "center" : "end"}
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
              </Styled.ButtonGrid>
            </GeneralStyled.Card>
          </Grid>
          <Styled.GraphTextGrid item xs={12} md={5} textAlign='center'>
            <GeneralStyled.Card>
              <RadarChart {...configRadarChart} />
              <GeneralStyled.BasicTypography fontSize='14px'>
                {i18n.t("text.compareWatches.graphDescription")}
              </GeneralStyled.BasicTypography>
            </GeneralStyled.Card>
          </Styled.GraphTextGrid>
        </Styled.MainGrid>
      </Styled.Container>
    </>
  );
};

export default CompareWatches;
