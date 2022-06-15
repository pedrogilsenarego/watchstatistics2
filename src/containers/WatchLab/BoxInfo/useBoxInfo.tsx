import { useState } from "react";
import { Redux } from "src/redux/types";
import { useSelector, useDispatch } from "react-redux";
import { updateBoxStatus } from "../../../redux/User/user.actions";
import { getRandomPart } from "src/Utils/gamyfication";
import { percentageLoot, getRandomInt } from "src/Utils/math";
import { bagSizeHelper } from "src/Utils/gamyfication";
import { updateSuccessNotification } from "src/redux/general/general.actions";
import {
  openBoxParts,
  openBoxPartsPercentage,
  openBoxFragmentsPercentage,
  getBox,
} from "src/constants/gamification";
import { TypeOfBox } from "src/containers/WatchLab/types"
import { FaPuzzlePiece, FaCoins } from "react-icons/fa";




interface Props {
  typeOfBox: TypeOfBox
}

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});

const useBoxInfo = ({ typeOfBox }: Props) => {
  const { currentUser } = useSelector(mapState);
  const [openBoxPopUp, setOpenBoxPopUp] = useState(false);
  const [popUpInf, setPopUpInfo] = useState<string | null>(null);
  const dispatch = useDispatch();
  var checkmark = "\u00BB";

  const returnTypeOfBoxString = () => {
    switch (typeOfBox) {
      case "whiteBox": return "White Box"
      case "blueBox": return "Blue Box"
      default: return "White Box"
    }
  }

  const handleFlagGetBox = () => {
    switch (typeOfBox) {
      case "whiteBox": return "getWhiteBox"
      case "blueBox": return "getBlueBox"
    }
  }
  const getIcon = () => {
    switch (typeOfBox) {
      case "whiteBox": return (<FaCoins size='2.5vh' color='orange' />)
      case "blueBox": return (<FaPuzzlePiece size='3vh' color='lightBlue' />)
    }
  }

  const getFieldToWithdraw = () => {
    switch (typeOfBox) {
      case "whiteBox": return "points"
      case "blueBox": return "blueBoxFragments"
      default: return "points"
    }
  }

  const handleGetBox = () => {
    const configData = {
      ...currentUser,
      flag: handleFlagGetBox(),
      [getFieldToWithdraw()]: currentUser?.[getFieldToWithdraw()] - getBox(typeOfBox),
      [typeOfBox]: currentUser?.[typeOfBox] + 1,
      userID: currentUser.id,
    };
    dispatch(updateBoxStatus(configData));
    dispatch(updateSuccessNotification(`You added a ${returnTypeOfBoxString()} to your collection`))
  };


  const handleOpenWhiteBox = () => {
    const a = [getRandomPart(openBoxParts(typeOfBox).MAIN_PART)];

    if (percentageLoot(openBoxPartsPercentage.SECONDARY_PART) === 1) {
      a.push(getRandomPart(openBoxParts(typeOfBox).SECONDARY_PART));
    }
    if (percentageLoot(openBoxPartsPercentage.THIRD_PART) === 1) {
      a.push(getRandomPart(openBoxParts(typeOfBox).THIRD_PART));
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
    handleGetBox,
    openBoxPopUp,
    setOpenBoxPopUp,
    popUpInf,
    getBoxDisabled,
    openBoxDisabled,
    returnTypeOfBoxString,
    getIcon
  };
};

export default useBoxInfo;
