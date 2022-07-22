import { MdLayersClear } from "react-icons/md";
import { RiFileShredFill } from "react-icons/ri"

export const listButtons = (handleClearList: () => void) => [
  {
    title: "Clear",
    icon: <MdLayersClear size="1.5em" color="lightGrey" />,
    onClick: handleClearList
  },
  {
    title: "Shred",
    icon: <RiFileShredFill size="1.5em" color="lightGrey" />,

  }

]