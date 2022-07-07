import { Container, Grid } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import { marginStyles } from "src/styles/constants";
import IncreaseDecreaseButton from "src/components/Buttons/IncreaseDecreaseButton";
import useGeneral from "./useGeneral";

const General = () => {
  const { setWhiteBoxesBuy } = useGeneral();
  return (
    <Container style={{ marginTop: marginStyles.MOBILE_CARD_MARGIN_TOP }}>
      <GeneralStyled.Card>
        <GeneralStyled.TitleTypography>Boxes</GeneralStyled.TitleTypography>
        <Grid
          container
          columnGap={2}
          style={{
            marginTop: marginStyles.MOBILE_BASIC_TYPO_TO_TITLE,

          }}
        >
          <GeneralStyled.BasicTypography>
            White Box
          </GeneralStyled.BasicTypography>
          <IncreaseDecreaseButton setValue={setWhiteBoxesBuy} />
        </Grid>
      </GeneralStyled.Card>
    </Container>
  );
};

export default General;
