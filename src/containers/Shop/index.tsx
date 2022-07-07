import TopHeader from "src/components/TopHeader";
import { menuButtons } from "./constants";
import useShop from "./useShope";
import { menuButtonsTypes } from "./types";
import General from "./General";

const Shop = () => {
  const { setWhichMenu, whichMenu } = useShop();
  return (
    <>
      <TopHeader listButtons={menuButtons(setWhichMenu)} />
      {whichMenu === menuButtonsTypes.GENERAL && <General />}
    </>
  );
};

export default Shop;
