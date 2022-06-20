import {useState, useEffect} from "react"
import { bagSizeHelper } from "src/Utils/gamyfication";
import {Redux} from "src/redux/types"
import { useSelector } from "react-redux";
import { TypeOfBox } from "./types";

const mapState = (state:Redux) => ({
  currentUser: state.user.currentUser,
});

const useWatchLab = () => {
  const [boxInfoMenu, setBoxInfoMenu] = useState<TypeOfBox>("whiteBox");
  const [x, setX] = useState(0);
  const [bagFull, setBagFull] = useState(false);
  const [collectionFull, setCollectionFull] = useState(false);
  const { currentUser } = useSelector(mapState);

  function watchParts() {
    if (currentUser)
      return currentUser?.watchParts || [];
    else return []
  }

  function getExperience() {
    if (currentUser) return currentUser?.experience || 0;
    else return 0
  }

  useEffect(
    () => {
      if (watchParts() >= bagSizeHelper(getExperience())) {
        setBagFull(true);
      } else setBagFull(false);
    },
    // eslint-disable-next-line
    [watchParts()]
  );

  
  useEffect(
    () => {
      if ((currentUser?.collection?.length || 0) >=
      bagSizeHelper(currentUser?.experience)) {
        setCollectionFull(true);
      } else setCollectionFull(false);
    },
    // eslint-disable-next-line
    [currentUser.collection]
  );

  const data = [
    {
      title: "Available Parts",
      items: watchParts(),
    },
    { title: "Fusion Machine", items: [] },
    { title: "Parts Shreder", items: [] },
  ];

  const configCentralButtons = {
    boxInfoMenu,
    setBoxInfoMenu,
    setX,
    x,
  };

  const configSlider = {
    x,
  };

  const configWatchParts = {
    data,
    bagFull,
    collectionFull,
    setBagFull,
  };

  return {configCentralButtons, configSlider, configWatchParts, boxInfoMenu}
}

export default useWatchLab