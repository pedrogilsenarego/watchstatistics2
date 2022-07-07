import { useState, useEffect } from "react";
import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";
import { getBox } from "src/constants/gamification";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

interface Props {
  setCartItems:(cartItems:number)=>void
}

const useGeneral = ({setCartItems}:Props) => {
  const [whiteBoxesBuy, setWhiteBoxesBuy] = useState(0);
  const [blueBoxesBuy, setblueBoxesBuy] = useState(0);
  const [purpleBoxesBuy, setPurpleBoxesBuy] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [currentBlueBoxFragments, setCurrentBlueBoxFragments] = useState(0);
  const [currentPurpleBoxFragments, setCurrentPurpleBoxFragments] = useState(0);
  const { currentUser } = useSelector(mapState);

  useEffect(()=>{
    setCartItems(whiteBoxesBuy+blueBoxesBuy+purpleBoxesBuy)
  })

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

  return {
    setWhiteBoxesBuy,
    currentPoints,
    currentUser,
    setblueBoxesBuy,
    currentBlueBoxFragments,
    currentPurpleBoxFragments,
    setPurpleBoxesBuy
  };
};
export default useGeneral;
