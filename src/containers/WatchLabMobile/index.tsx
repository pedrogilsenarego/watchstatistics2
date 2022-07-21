import * as GeneralStyles from "src/styles/styles";
import { Grid } from "@mui/material"
import { marginStyles } from "src/styles/constants";

const WatchLabMobile = () => {
  return (
    <GeneralStyles.Container mobile>
      <GeneralStyles.Card>
        <Grid container justifyContent="center">
          <GeneralStyles.TitleTypography>Watch Parts Shredder</GeneralStyles.TitleTypography></Grid>
      </GeneralStyles.Card>
      <GeneralStyles.Card style={{ marginTop: marginStyles.MOBILE_CARD_MARGIN_TOP }}>
        <Grid container justifyContent="center">
          <GeneralStyles.TitleTypography>Watch Builder</GeneralStyles.TitleTypography></Grid>
      </GeneralStyles.Card>
    </GeneralStyles.Container>
  );
};

export default WatchLabMobile;
