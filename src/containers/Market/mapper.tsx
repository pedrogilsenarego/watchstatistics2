import { ImCross } from "react-icons/im";

const deleteIcon = <ImCross fontSize='1em' color="#ffffffCE" style={{ cursor: "pointer" }} />

const mapMarketItem = (marketItems: any, pos: number) => {
  const power = marketItems.avgTotal
  console.log(power)
  return {
    id: pos,
    //productID: cartItems.productID,
    description:
      marketItems.productBrand +
      " " +
      marketItems.productName +
      " " +
      marketItems.reference,
    generalState: marketItems.generalState,
    polishState: marketItems.polishState,
    movementState: marketItems.movementState,
    power: marketItems.avgTotal
    // show: [
    //   {
    //     buttonType: "toggle",
    //     event: "show",
    //     label: "Show/Hide this watch",
    //     disabled: false,
    //   },
    // ],
    // delete: [
    //   {
    //     buttonType: "icon",
    //     event: "delete",
    //     icon: deleteIcon,
    //     label: "Remove this watch",
    //   },
    // ],
  };
};

const mapMarketItems = (marketItems: any) => {
  return { rows: marketItems.map((p: any, pos: number) => mapMarketItem(p, pos)) };
};

export { mapMarketItems };
