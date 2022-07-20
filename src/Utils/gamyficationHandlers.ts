import { getRandomPart } from "./gamyfication";
import { openBoxParts } from "src/constants/gamification";
import { percentageLoot } from "./math";

export const handleOpenBox = (typeOfBox:string) => {
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