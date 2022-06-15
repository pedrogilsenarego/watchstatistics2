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
import { TypeOfBox } from "src/containers/WatchLab/types";
import { FaPuzzlePiece, FaCoins } from "react-icons/fa";

interface Props {
  typeOfBox: TypeOfBox;
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
      case "whiteBox":
        return "White Box";
      case "blueBox":
        return "Blue Box";
      case "purpleBox":
        return "Purple Box";
      default:
        return "White Box";
    }
  };

  const handleFlagGetBox = () => {
    switch (typeOfBox) {
      case "whiteBox":
        return "getWhiteBox";
      case "blueBox":
        return "getBlueBox";
      case "purpleBox":
        return "getPurpleBox";
    }
  };
  const handleFlagOpenBox = () => {
    switch (typeOfBox) {
      case "whiteBox":
        return "openWhiteBox";
      case "blueBox":
        return "openBlueBox";
      case "purpleBox":
        return "openPurpleBox";
    }
  };
  const getIcon = () => {
    switch (typeOfBox) {
      case "whiteBox":
        return <FaCoins size='2.5vh' color='orange' />;
      case "blueBox":
        return <FaPuzzlePiece size='3vh' color='lightBlue' />;
      case "purpleBox":
        return <FaPuzzlePiece size='3vh' color='purple' />;
    }
  };

  const getFieldToWithdraw = () => {
    switch (typeOfBox) {
      case "whiteBox":
        return "points";
      case "blueBox":
        return "blueBoxFragments";
      case "purpleBox":
        return "purpleBoxFragments";
      default:
        return "points";
    }
  };

  const handleGetBox = () => {
    const configData = {
      ...currentUser,
      flag: handleFlagGetBox(),
      [getFieldToWithdraw()]:
        currentUser?.[getFieldToWithdraw()] - getBox(typeOfBox),
      [typeOfBox]: currentUser?.[typeOfBox] + 1,
      userID: currentUser.id,
    };
    dispatch(updateBoxStatus(configData));
    dispatch(
      updateSuccessNotification(
        `You added a ${returnTypeOfBoxString()} to your collection`
      )
    );
  };

  const handleOpenBox = () => {
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
      flag: handleFlagOpenBox(),
      [typeOfBox]: currentUser?.[typeOfBox] - 1,
      [openBoxParts(typeOfBox).MAIN_FRAGMENTS]:
        currentUser?.[openBoxParts(typeOfBox).MAIN_FRAGMENTS] +
        getRandomInt(
          openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MIN,
          openBoxFragmentsPercentage.SECONDARY_FRAGMENTS_MAX
        ),
      [openBoxParts(typeOfBox).SECONDARY_FRAGMENTS]:
        currentUser?.[openBoxParts(typeOfBox).SECONDARY_FRAGMENTS] +
        percentageLoot(openBoxFragmentsPercentage.THIRD_FRAGMENTS),
      watchParts: a,
      userID: currentUser.id,
    };
    dispatch(updateBoxStatus(configData));
    setOpenBoxPopUp(true);
    setPopUpInfo(
      "You received: " +
      Number(
        configData?.[openBoxParts(typeOfBox).MAIN_FRAGMENTS] -
        currentUser?.[openBoxParts(typeOfBox).MAIN_FRAGMENTS]
      ) +
      ` ${openBoxParts(typeOfBox).SECONDARY_FRAGMENT_STRING
      } Box Fragments, ` +
      Number(
        configData?.[openBoxParts(typeOfBox).SECONDARY_FRAGMENTS] -
        currentUser?.[openBoxParts(typeOfBox).SECONDARY_FRAGMENTS]
      ) +
      ` ${openBoxParts(typeOfBox).THIRD_FRAGMENTS_STRING} Box Fragments, ` +
      c
    );
  };

  const getBoxDisabled = () => {
    if (currentUser?.[getFieldToWithdraw()] < getBox(typeOfBox)) {
      return true;
    } else return false;
  };

  const openBoxDisabled = () => {
    if (
      currentUser?.[typeOfBox] < 1 ||
      (currentUser.watchParts &&
        currentUser.watchParts.length >= bagSizeHelper(currentUser?.experience))
    ) {
      return true;
    } else return false;
  };

  return {
    checkmark,
    handleOpenBox,
    handleGetBox,
    openBoxPopUp,
    setOpenBoxPopUp,
    popUpInf,
    getBoxDisabled,
    openBoxDisabled,
    returnTypeOfBoxString,
    getIcon,
  };
};

export default useBoxInfo;
