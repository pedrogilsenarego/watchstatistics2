import { Container } from "@mui/material";
import { StyledCard, StyledBasicTypography } from "src/styles/styles";
import { i18n } from "src/translations/i18n"

const DevelopmentPoles = () => {
  return (
    <Container style={{ marginTop: "200px" }}>
      <StyledCard>
        <StyledBasicTypography>{i18n.t("text.developmentPoles.title")}</StyledBasicTypography>
      </StyledCard>
    </Container>
  );
};

export default DevelopmentPoles;
