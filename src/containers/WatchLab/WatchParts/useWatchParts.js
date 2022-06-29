import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { percentageLoot } from "src/Utils/math";
import { getRandomPart } from "src/Utils/gamyfication";
import { updateBoxStatus } from "src/redux/User/user.actions";
import { colorWatchParts, boosterValue } from "src/Utils/gamyfication";
import { randomWeightedNumber } from "src/Utils/math";
import { fetchRandomProduct } from "src/redux/Products/products.actions";

const mapState = (state) => ({
  randomProduct: state.productsData.randomNewProduct,
  currentUser: state.user.currentUser,
  cartBoosters: state.cartData.cartBoosters,
});

const useWatchParts = ({ setBagFull, data }) => {
  const [list, setList] = useState(data);
  const [fusionGlass, setFusionGlass] = useState(false);
  const [fusionCrown, setFusionCrown] = useState(false);
  const [fusionMovement, setFusionMovement] = useState(false);
  const [fusionBracelet, setFusionBracelet] = useState(false);
  const [fusionCase, setFusionCase] = useState(false);
  const [fusionMatchParts, setFusionMatchParts] = useState(true);
  const [fusionPrice, setFusionPrice] = useState("");
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [boostStatus, setBoostStatus] = useState("false");
  const [openPopupNewWatch, setOpenPopupNewWatch] = useState(false);
  const [numberBoosters, setNumberBoosters] = useState(0);
  const [modalProduct, setModalProduct] = useState({});
  const { randomProduct, currentUser, cartBoosters } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalProduct(randomProduct);
  }, [randomProduct]);

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  useEffect(() => {
    if (list[1].items.join("").includes("Crown")) {
      setFusionCrown(true);
    } else setFusionCrown(false);
    if (list[1].items.join("").includes("Case")) {
      setFusionCase(true);
    } else {
      setFusionCase(false);
    }

    if (list[1].items.join("").includes("Bracelet")) {
      setFusionBracelet(true);
    } else setFusionBracelet(false);
    if (list[1].items.join("").includes("Glass")) {
      setFusionGlass(true);
    } else setFusionGlass(false);
    if (list[1].items.join("").includes("Movement")) {
      setFusionMovement(true);
    } else setFusionMovement(false);

    const a = [];
    for (var i = 0; i < list[1].items.length; i++) {
      const b = list[1].items[i].slice(0, 1);
      a.push(b);
    }
    const allEqual = (a) => a.every((val) => val === a[0]);
    if (!allEqual(a)) {
      setFusionMatchParts(false);
    } else setFusionMatchParts(true);
  }, [list]);

  const itemsBagDeleted = (pos) => {
    var a = currentUser.watchParts;
    for (var i = 0; i < pos.length; i++) {
      a.splice(a.indexOf(pos[i]), 1);
    }
    return a;
  };

  const handleDeleteWatchParts = (pos, color, percentage, color2) => {
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

  const shredderMeter = (data) => {
    var a = 0;
    for (var i = 0; i < data.length; i++) {
      a = a + 1 + parseInt(data[i][0]);
    }
    return a;
  };

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handleDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current !== e.target) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].items.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].items.splice(
            dragItem.current.itemI,
            1
          )[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };

  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "#3C3939";
    }
    return colorWatchParts(item.item);
  };

  const handleFusionNewWatch = () => {
    const numbers = [
      1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8,
      8, 9,
    ];
    if (boostStatus === "false") {
      const randomValue = randomWeightedNumber(numbers);
      const configData = {
        ...currentUser,
        userID: currentUser.id,
        collection: currentUser.collection ? currentUser.collection : [],
        randomValue,
        fusionPrice,
      };
      dispatch(fetchRandomProduct(configData));
    }
    if (boostStatus === "fail") {
      const randomValue = randomWeightedNumber();
      const configData = {
        ...currentUser,
        userID: currentUser.id,
        collection: currentUser.collection ? currentUser.collection : [],
        boosters: currentUser?.boosters - numberBoosters || 0,
        randomValue,
        fusionPrice,
      };
      dispatch(fetchRandomProduct(configData));
    }
    if (boostStatus === "true") {
      const configData = {
        ...currentUser,
        userID: currentUser.id,
        collection: currentUser.collection ? currentUser.collection : [],
        boosters: currentUser?.boosters - numberBoosters || 0,
        fusionPrice,
        randomValue: "boosted",
        boosted: boosterValue(fusionPrice, cartBoosters),
      };
      dispatch(fetchRandomProduct(configData));
    }
    setOpenPopupNewWatch(true);
    setFusionPrice("");
  };

  return {
    dragging,
    setDragging,
    ready,
    setReady,
    openConfirmDelete,
    setOpenConfirmDelete,
    setBoostStatus,
    openPopupNewWatch,
    setOpenPopupNewWatch,
    modalProduct,
    handleDeleteWatchParts,
    shredderMeter,
    fusionPrice,
    numberBoosters,
    setNumberBoosters,
    fusionGlass,
    fusionBracelet,
    fusionCase,
    fusionCrown,
    fusionMovement,
    list,
    setList,
    fusionMatchParts,
    setFusionPrice,
    handleDragStart,
    handleDragEnter,
    getStyles,
    handleFusionNewWatch,
    boostStatus,
  };
};

export default useWatchParts;
