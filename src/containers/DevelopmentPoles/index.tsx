import { Container, useTheme, useMediaQuery } from "@mui/material";
import { StyledCard, StyledBasicTypography } from "src/styles/styles";
import { i18n } from "src/translations/i18n"


const DevelopmentPoles = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Container style={{ marginTop: mobile ? "100px" : "200px" }}>
      <StyledCard>
        <StyledBasicTypography>{i18n.t("text.developmentPoles.title")}</StyledBasicTypography>
      </StyledCard>
    </Container>
  );
};

export default DevelopmentPoles;
