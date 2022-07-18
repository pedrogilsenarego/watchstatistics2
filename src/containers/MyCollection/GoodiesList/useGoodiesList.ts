import { useState } from "react";
import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";

const mapState = (state: Redux) => ({
  currentUser: state.user.currentUser,
});
const useGoodiesList = () => {
  const { currentUser } = useSelector(mapState);
  const [helperPopup, setHelperPopup] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [typeOfBox, setTypeOfBox] = useState<string>("");
  const handleAction = () => null;
  const handleBoxPopup = (typeOfBox: string) => {
    switch (typeOfBox) {
      case "whiteBox":
        setTitle("White Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true)
        break;
      case "blueBox":
        setTitle("Blue Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true)
        break;
      case "purpleBox":
        setTitle("Purple Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true)
        break;
      default:
        setTitle("White Box");
        setTypeOfBox(typeOfBox);
        setHelperPopup(true)
        break;
    }
  };

  return {
    handleAction,
    currentUser,
    helperPopup,
    setHelperPopup,
    handleBoxPopup,
    title,
    typeOfBox,
  };
};

export default useGoodiesList;
