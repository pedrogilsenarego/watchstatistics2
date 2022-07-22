import { useState } from "react";
import {removeOneTimeString} from "src/Utils/arrayUtils"

const useShredderDrawer = () => {
  const [listShred, setListShred] = useState<string[] | []>([]);

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

  return { handleAddToList, listShred, handleClearList };
};

export default useShredderDrawer;
