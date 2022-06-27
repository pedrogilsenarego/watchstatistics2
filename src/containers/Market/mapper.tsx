import { ImCross } from "react-icons/im";
import { watchTotalValue } from "src/Utils/gamyfication";

const deleteIcon = <ImCross fontSize='1em' color="#ffffffCE" style={{ cursor: "pointer" }} />

const mapMarketItem = (marketItems: any, pos: number) => {
  return {
    id: pos,
    preview: marketItems.image,
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
    power: watchTotalValue(
      marketItems.avgTotal,
      marketItems.generalState,
      marketItems.polishState,
      marketItems.movementState
    ),
    rating: ((marketItems.generalState + marketItems.polishState + marketItems.movementState) /
      6
    ).toFixed(1),
    price: marketItems.price
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
