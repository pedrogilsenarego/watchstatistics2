import { useState, useEffect } from "react";
import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";
import { getBox, typeBox, typeCurrency } from "src/constants/gamification";
import { useDispatch } from "react-redux";
import { updateBoxStatus } from "src/redux/User/user.actions";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

interface Props {
  setCartItems: (cartItems: number) => void;
}

const useGeneral = ({ setCartItems }: Props) => {
  const dispatch = useDispatch();
  const [whiteBoxesBuy, setWhiteBoxesBuy] = useState(0);
  const [blueBoxesBuy, setblueBoxesBuy] = useState(0);
  const [purpleBoxesBuy, setPurpleBoxesBuy] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [currentBlueBoxFragments, setCurrentBlueBoxFragments] = useState(0);
  const [currentPurpleBoxFragments, setCurrentPurpleBoxFragments] = useState(0);
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    setCartItems(whiteBoxesBuy + blueBoxesBuy + purpleBoxesBuy);
  });

  useEffect(() => {
    setCurrentPoints(currentUser?.points - whiteBoxesBuy * getBox("whiteBox"));
  }, [currentUser?.points, whiteBoxesBuy]);

  useEffect(() => {
    setCurrentBlueBoxFragments(
      currentUser?.blueBoxFragments - blueBoxesBuy * getBox("blueBox")
    );
  }, [currentUser?.blueBoxFragments, blueBoxesBuy]);

  useEffect(() => {
    setCurrentPurpleBoxFragments(
      currentUser?.purpleBoxFragments - purpleBoxesBuy * getBox("purpleBox")
    );
  }, [currentUser?.purpleBoxFragments, purpleBoxesBuy]);

  const handleClearCart = () => {
    setWhiteBoxesBuy(0);
    setblueBoxesBuy(0);
    setPurpleBoxesBuy(0);
  };

  const handleBuyFromCart = () => {
    const payload = {
      listItems: {
        ...(whiteBoxesBuy && {
          whiteBox: {
            value: whiteBoxesBuy,
            currency: -(whiteBoxesBuy * getBox(typeBox.WHITE_BOX)),
            typeCurrency: typeCurrency.POINTS,
          },
        }),
        ...(blueBoxesBuy && {
          blueBox: {
            value: blueBoxesBuy,
            currency: -(blueBoxesBuy * getBox(typeBox.BLUE_BOX)),
            typeCurrency: typeCurrency.BLUE_BOX_FRAGMENTS,
          },
        }),
        ...(purpleBoxesBuy && {
          purpleBox: {
            value: purpleBoxesBuy,
            currency: -(purpleBoxesBuy * getBox(typeBox.PURPLE_BOX)),
            typeCurrency: typeCurrency.PURPLE_BOX_FRAGMENTS,
          },
        }),
      },
      userID: currentUser.id,
      flag: "multipleShop",
    };
    dispatch(updateBoxStatus(payload));
    handleClearCart()
  };

  return {
    setWhiteBoxesBuy,
    whiteBoxesBuy,
    currentPoints,
    currentUser,
    setblueBoxesBuy,
    blueBoxesBuy,
    currentBlueBoxFragments,
    currentPurpleBoxFragments,
    setPurpleBoxesBuy,
    purpleBoxesBuy,
    handleClearCart,
    handleBuyFromCart,
  };
};
export default useGeneral;
