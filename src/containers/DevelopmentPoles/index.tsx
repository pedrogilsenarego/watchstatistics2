import { Container, useTheme, useMediaQuery } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import { i18n } from "src/translations/i18n"


const DevelopmentPoles = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Container style={{ marginTop: mobile ? "100px" : "200px" }}>
      <GeneralStyled.Card>
        <GeneralStyled.BasicTypography>{i18n.t("text.developmentPoles.title")}</GeneralStyled.BasicTypography>
      </GeneralStyled.Card>
    </Container>
  );
};

export default DevelopmentPoles;
