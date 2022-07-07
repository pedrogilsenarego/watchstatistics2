import { Container, Stack } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import { marginStyles } from "src/styles/constants";
import useGeneral from "./useGeneral";
import { FaCoins } from "react-icons/fa";
import AcquireIncrementor from "src/components/AcquireIncrementor";

const General = () => {
  const { setWhiteBoxesBuy, currentPoints, currentUser } = useGeneral();
  const pointsIcon = <FaCoins color="white" size="1.5em" />;
  return (
    <Container style={{ marginTop: marginStyles.MOBILE_CARD_MARGIN_TOP }}>
      <GeneralStyled.Card>
        <GeneralStyled.TitleTypography>Boxes</GeneralStyled.TitleTypography>
        <Stack style={{ marginTop: marginStyles.MOBILE_BASIC_TYPO_TO_TITLE }}>
          <AcquireIncrementor
            title='White Boxes'
            setValue={setWhiteBoxesBuy}
            currency={currentPoints}
            icon={pointsIcon}
            currentValue={currentUser?.whiteBox || 0}
          />
        </Stack>
      </GeneralStyled.Card>
    </Container>
  );
};

export default General;
