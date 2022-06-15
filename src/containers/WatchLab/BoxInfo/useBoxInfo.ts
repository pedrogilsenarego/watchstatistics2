import { useState } from "react";
import { Redux } from "src/redux/types";
import { useSelector, useDispatch } from "react-redux";
import { updateBoxStatus } from "../../../redux/User/user.actions";
import { getRandomPart } from "src/Utils/gamyfication";
import { percentageLoot, getRandomInt } from "src/Utils/math";
import { bagSizeHelper } from "src/Utils/gamyfication";
import {
  openBoxParts,
  openBoxPartsPercentage,
  openBoxFragmentsPercentage,
} from "src/constants/gamification";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

const useBoxInfo = () => {
  const { currentUser } = useSelector(mapState);
  const [openBoxPopUp, setOpenBoxPopUp] = useState(false);
  const [popUpInf, setPopUpInfo] = useState<string | null>(null);
  const dispatch = useDispatch();
  var checkmark = "\u00BB";

  const handleGetWhiteBox = () => {
    const configData = {
      ...currentUser,
      flag: "getWhitebox",
      points: currentUser?.points - 4,
      whiteBox: currentUser?.whiteBox + 1,
      userID: currentUser.id,
    };
    dispatch(updateBoxStatus(configData));
  };

  const handleOpenWhiteBox = () => {
    const a = [getRandomPart(openBoxParts.MAIN_PART_WHITE_BOX)];

    if (percentageLoot(openBoxPartsPercentage.SECONDARY_PART) === 1) {
      a.push(getRandomPart(openBoxParts.SECONDARY_PART_WHITE_BOX));
    }
    if (percentageLoot(openBoxPartsPercentage.THIRD_PART) === 1) {
      a.push(getRandomPart(openBoxParts.THIRD_PART_WHITE_BOX));
    }
    let b = [...a];
    var c = b.map((s) => s?.slice(1));

    if (currentUser.watchParts) {
      a.unshift(...currentUser?.watchParts);
    }
    const configData = {
      ...currentUser,
      flag: "openWhitebox",
      whiteBox: currentUser?.whiteBox - 1,
      blueBoxFragments:
        currentUser?.blueBoxFragments +
        getRandomInt(
          openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MIN,
          openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MAX
        ),
      purpleBoxFragments:
        currentUser?.purpleBoxFragments +
        percentageLoot(openBoxFragmentsPercentage.THIRD_FRAGMENTS),
      watchParts: a,
      userID: currentUser.id,
    };
    dispatch(updateBoxStatus(configData));
    setOpenBoxPopUp(true);
    setPopUpInfo(
      "You received: " +
        Number(configData.blueBoxFragments - currentUser?.blueBoxFragments) +
        " Blue Box Fragments, " +
        Number(
          configData.purpleBoxFragments - currentUser?.purpleBoxFragments
        ) +
        " Purple Box Fragments, " +
        c
    );
  };

  const getBoxDisabled = () => {
    if (currentUser?.points < 4) {
      return true;
    } else return false;
  };

  const openBoxDisabled = () => {
    if (
      currentUser?.whiteBox < 1 ||
      (currentUser.watchParts &&
        currentUser.watchParts.length >= bagSizeHelper(currentUser?.experience))
    ) {
      return true;
    } else return false;
  };

  return {
    checkmark,
    handleOpenWhiteBox,
    handleGetWhiteBox,
    openBoxPopUp,
    setOpenBoxPopUp,
    popUpInf,
    getBoxDisabled,
    openBoxDisabled,
  };
};

export default useBoxInfo;
