import { Container, Stack } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import { marginStyles } from "src/styles/constants";
import useGeneral from "./useGeneral";
import { FaCoins, FaPuzzlePiece } from "react-icons/fa";
import AcquireIncrementor from "src/components/AcquireIncrementor";
import { getBox } from "src/constants/gamification";
import MobileBottomAppBar from "src/components/MobileBottomAppBar";
import { menuButtons } from "./constants";
import CartPopup from "./CartPopup";

interface Props {
  setCartItems: (cartItems: number) => void;
  cartItems: number;
}

const General = ({ setCartItems, cartItems }: Props) => {
  const {
    setWhiteBoxesBuy,
    whiteBoxesBuy,
    currentPoints,
    currentUser,
    currentBlueBoxFragments,
    setblueBoxesBuy,
    blueBoxesBuy,
    setPurpleBoxesBuy,
    purpleBoxesBuy,
    currentPurpleBoxFragments,
    handleClearCart,
    handleBuyFromCart,
    cartOpenPopup,
    setCartOpenPopup,
    listItems,
  } = useGeneral({ setCartItems });
  const pointsIcon = <FaCoins color='white' size='1.5em' />;
  const pieceIcon = (color: string) => (
    <FaPuzzlePiece color={color} size='1.5em' />
  );
  return (
    <>
      <CartPopup
        openPopup={cartOpenPopup}
        setOpenPopup={setCartOpenPopup}
        listItems={listItems}
        handleClearCart={handleClearCart}
      />
      <MobileBottomAppBar
        listButtons={menuButtons(cartItems, handleClearCart, handleBuyFromCart)}
      />
      <Container style={{ marginTop: "20px" }}>
        <GeneralStyled.Card>
          <GeneralStyled.TitleTypography>Boxes</GeneralStyled.TitleTypography>
          <Stack
            rowGap={1}
            style={{ marginTop: marginStyles.MOBILE_BASIC_TYPO_TO_TITLE }}
          >
            <AcquireIncrementor
              title='White Boxes'
              value={whiteBoxesBuy}
              setValue={setWhiteBoxesBuy}
              currency={currentPoints}
              icon={pointsIcon}
              costPerUnit={getBox("whiteBox")}
              currentValue={currentUser?.whiteBox || 0}
            />
            <AcquireIncrementor
              title='Blue Boxes'
              setValue={setblueBoxesBuy}
              value={blueBoxesBuy}
              currency={currentBlueBoxFragments}
              icon={pieceIcon("lightBlue")}
              costPerUnit={getBox("blueBox")}
              currentValue={currentUser?.blueBox || 0}
            />
            <AcquireIncrementor
              title='Purple Boxes'
              setValue={setPurpleBoxesBuy}
              value={purpleBoxesBuy}
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
