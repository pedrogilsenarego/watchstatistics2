import { useState } from "react";
import { Redux } from "src/redux/types";
import { useSelector, useDispatch } from "react-redux";
import { bagSizeHelper, getRandomPart } from "src/Utils/gamyfication";
import { getRandomInt, percentageLoot } from "src/Utils/math";
import {
  openBoxParts,
  openBoxPartsPercentage,
  flagOpenBox,
  openBoxFragmentsPercentage,
} from "src/constants/gamification";
import { updateBoxStatus } from "src/redux/User/user.actions";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});
const useGoodiesList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [openBoxPopup, setOpenBoxPopUp] = useState<boolean>(false);
  const [popUpInfo, setPopUpInfo] = useState<string>("");
  const [helperPopup, setHelperPopup] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [typeOfBox, setTypeOfBox] = useState<string>("");
  const handleAction = () => null;
  const handleBoxPopup = (typeOfBox: string) => {
    switch (typeOfBox) {
      case "whiteBox":
        setTitle("White Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true);
        break;
      case "blueBox":
        setTitle("Blue Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true);
        break;
      case "purpleBox":
        setTitle("Purple Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true);
        break;
      default:
        setTitle("White Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true);
        break;
    }
  };

  const handleOpenBox = async (typeOfBox: string) => {
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
      flag: flagOpenBox(typeOfBox),
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
        ` ${
          openBoxParts(typeOfBox).SECONDARY_FRAGMENT_STRING
        } Box Fragments, ` +
        Number(
          configData?.[openBoxParts(typeOfBox).SECONDARY_FRAGMENTS] -
            currentUser?.[openBoxParts(typeOfBox).SECONDARY_FRAGMENTS]
        ) +
        ` ${openBoxParts(typeOfBox).THIRD_FRAGMENTS_STRING} Box Fragments, ` +
        c
    );
   
    
  };
  
  const openBoxDisabled = (typeOfBox:string) => {
    if (
      currentUser?.[typeOfBox] < 1 || currentUser?.[typeOfBox] === undefined ||
      (currentUser.watchParts &&
        currentUser.watchParts.length >= bagSizeHelper(currentUser?.experience))
    ) {
      return true;
    } else return false;
  };

  return {
    handleAction,
    currentUser,
    helperPopup,
    setHelperPopup,
    handleBoxPopup,
    title,
    typeOfBox,
    handleOpenBox,
    openBoxPopup,
    setOpenBoxPopUp,
    popUpInfo,
    openBoxDisabled
  };
};

export default useGoodiesList;
