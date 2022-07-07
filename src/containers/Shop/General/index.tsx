import { Container } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import { marginStyles } from "src/styles/constants";

const General = () => {
  return (
    <Container style={{ marginTop: marginStyles.MOBILE_CARD_MARGIN_TOP }}>
      <GeneralStyled.Card>
        <GeneralStyled.TitleTypography>Boxes</GeneralStyled.TitleTypography>
      </GeneralStyled.Card>
    </Container>
  );
};

export default General;
