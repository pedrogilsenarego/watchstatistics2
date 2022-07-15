import { ListItems } from "../../types";

export const actions = (
  handleBuyFromCart: any,
  setOpenPopup: (openPopup: boolean) => void,
  listItems: ListItems
) => [
  {
    title: "Back",
    onClick: () => setOpenPopup(false),
  },
  {
    title: "Confirm",
    onClick: () => {
      handleBuyFromCart();
      setOpenPopup(false);
    },
    disabled: Object.keys(listItems).length !== 0 ? false : true
  },
];
