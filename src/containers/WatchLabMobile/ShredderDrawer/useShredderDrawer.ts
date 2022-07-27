import { useState } from "react";
import {removeOneTimeString} from "src/Utils/arrayUtils"
import { useDispatch, useSelector } from "react-redux";
import { updateSuccessNotification } from "src/redux/general/general.actions";
import { updateBoxStatus } from "src/redux/User/user.actions";
import { Redux } from "src/redux/types";
import { getRandomPart, LinearProgressBarColor, LinearProgressBarColor2, LinearProgressBarFormat, shredderMeter } from "src/Utils/gamyfication";
import { percentageLoot } from "src/Utils/math";

const useShredderDrawer = () => {
  const [listShred, setListShred] = useState<string[] | []>([]);
  const dispatch = useDispatch()
  const currentUser = useSelector<Redux, any>((state) => state.user.currentUser)
  const valueFromPart = shredderMeter(listShred)

  const itemsBagDeleted = (pos:string[]) => {
    var a = currentUser.watchParts;
    for (var i = 0; i < pos.length; i++) {
      a.splice(a.indexOf(pos[i]), 1);
    }
    return a;
  };

  const handleAddToList = (item: string, action: "add" | "remove") => {
    switch (action) {
      case "add":
        setListShred([...listShred, item]);
        break;
      case "remove":
        setListShred(removeOneTimeString(listShred,item));
        break;
      default:
        break;
    }
  };

  const handleClearList = () => {
    setListShred([])
  }

  const handleDeleteWatchParts = (pos:string[], color:string, percentage:number |undefined, color2:string) => {
    const a = itemsBagDeleted(pos);

    if (percentage && color && percentageLoot(percentage) === 1) {
      const b = getRandomPart(color);
      a.push(b);
    } else {
      if (color2 && color2 !== "black") {
        const b = getRandomPart(color2);
        a.push(b);
      }
    }

    const configData = {
      ...currentUser,
      flag: "deleteWatchPart",
      watchParts: a,
      userID: currentUser.id,
    };
    dispatch(updateBoxStatus(configData));
  };

  const handleShredPart = () => {
    // setLoadingButton(true);
    try {
      handleDeleteWatchParts(
        listShred,
        LinearProgressBarColor(valueFromPart),
        LinearProgressBarFormat(valueFromPart),
        LinearProgressBarColor2(valueFromPart)
      );
      handleClearList()
      dispatch(
        updateSuccessNotification("The parts were shredded into new parts")
      );
    } catch (error) {
      console.log(error);
    } finally {
      // setLoadingButton(false);
      
    }
  };

  return { handleAddToList, listShred, handleClearList, handleShredPart };
};

export default useShredderDrawer;
