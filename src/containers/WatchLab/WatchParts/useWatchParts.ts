import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "src/redux/types";
import { percentageLoot } from "src/Utils/math";
import {getRandomPart} from "src/Utils/gamyfication"
import { updateBoxStatus } from "src/redux/User/user.actions";

const mapState = (state: Redux) => ({
  randomProduct: state.productsData.randomNewProduct,
  currentUser: state.user.currentUser,
  cartBoosters: state.cartData.cartBoosters,
});

interface Props {
  setBagFull: (bafFull:boolean) => void
}

const useWatchParts = ({setBagFull}:Props) => {
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [boostStatus, setBoostStatus] = useState("false");
  const [openPopupNewWatch, setOpenPopupNewWatch] = useState(false);
  const { randomProduct, currentUser, cartBoosters } = useSelector(mapState);
  const dispatch = useDispatch();

  const itemsBagDeleted = (pos: any) => {
    var a = currentUser.watchParts;
    for (var i = 0; i < pos.length; i++) {
      a.splice(a.indexOf(pos[i]), 1);
    }
    return a;
  };

  const handleDeleteWatchParts = (pos: any, color: string, percentage: number, color2: string) => {
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
    setBagFull(false);
  };

  return {
    dragging,
    setDragging,
    dispatch,
    ready,
    setReady,
    openConfirmDelete,
    setOpenConfirmDelete,
    boostStatus,
    setBoostStatus,
    openPopupNewWatch,
    setOpenPopupNewWatch,
    randomProduct,
    currentUser,
    cartBoosters,
    handleDeleteWatchParts
  };
};

export default useWatchParts;
