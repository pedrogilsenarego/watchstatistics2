import { Container, Stack } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import { marginStyles } from "src/styles/constants";
import useGeneral from "./useGeneral";
import { FaCoins, FaPuzzlePiece } from "react-icons/fa";
import AcquireIncrementor from "src/components/AcquireIncrementor";
import { getBox } from "src/constants/gamification";
import MobileBottomAppBar from "src/components/MobileBottomAppBar";
import { menuButtons } from "./constants"

interface Props {
  setCartItems: (cartItems: number) => void
}

const General = ({ setCartItems }: Props) => {
  const {
    setWhiteBoxesBuy,
    currentPoints,
    currentUser,
    currentBlueBoxFragments,
    setblueBoxesBuy,
    setPurpleBoxesBuy,
    currentPurpleBoxFragments
  } = useGeneral({ setCartItems });
  const pointsIcon = <FaCoins color='white' size='1.5em' />;
  const pieceIcon = (color: string) => (
    <FaPuzzlePiece color={color} size='1.5em' />
  );
  return (
    <>
      <MobileBottomAppBar listButtons={menuButtons} />
      <Container style={{ marginTop: "20px" }}>
        <GeneralStyled.Card>
          <GeneralStyled.TitleTypography>Boxes</GeneralStyled.TitleTypography>
          <Stack rowGap={1} style={{ marginTop: marginStyles.MOBILE_BASIC_TYPO_TO_TITLE }}>
            <AcquireIncrementor
              title='White Boxes'
              setValue={setWhiteBoxesBuy}
              currency={currentPoints}
              icon={pointsIcon}
              costPerUnit={getBox("whiteBox")}
              currentValue={currentUser?.whiteBox || 0}
            />
            <AcquireIncrementor
              title='Blue Boxes'
              setValue={setblueBoxesBuy}
              currency={currentBlueBoxFragments}
              icon={pieceIcon("lightBlue")}
              costPerUnit={getBox("blueBox")}
              currentValue={currentUser?.blueBox || 0}
            />
            <AcquireIncrementor
              title='Purple Boxes'
              setValue={setPurpleBoxesBuy}
              currency={currentPurpleBoxFragments}
              icon={pieceIcon("purple")}
              costPerUnit={getBox("purpleBox")}
              currentValue={currentUser?.purpleBox || 0}
            />
          </Stack>
        </GeneralStyled.Card>
      </Container>
    </>
  );
};

export default General;
