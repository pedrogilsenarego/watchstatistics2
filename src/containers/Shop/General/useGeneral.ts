import { useState, useEffect } from "react";
import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";
import { getBox } from "src/constants/gamification";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

const useGeneral = () => {
  const [whiteBoxesBuy, setWhiteBoxesBuy] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    setCurrentPoints(currentUser?.points - whiteBoxesBuy * getBox("whiteBox"));
  }, [currentUser?.points, whiteBoxesBuy]);

  return { setWhiteBoxesBuy, currentPoints, currentUser };
};
export default useGeneral;
