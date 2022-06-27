import { MdOutlineGetApp } from "react-icons/md";
import { watchTotalValue } from "src/Utils/gamyfication";

const buyIcon = <MdOutlineGetApp fontSize='1em' color="#ffffffCE" style={{ cursor: "pointer" }} />

const mapMarketItem = (marketItems: any, pos: number) => {
  return {
    id: pos,
    preview: marketItems.image,
    productID: marketItems.id,
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
    price: marketItems.price,
    buy: [
      {
        buttonType: "icon",
        confirmationRequired: true,
        event: "buy",
        icon: buyIcon,
        label: "Buy this watch",
        confirmationTitle: "Confirm the purchase",
        confirmationDescription: "Add to your collection this watch",
        confirmationButtonLabel: "Accept",
        declineButtonLabel: "Decline",
      },

    ],
  };
};

const mapMarketItems = (marketItems: any) => {
  return { rows: marketItems.map((p: any, pos: number) => mapMarketItem(p, pos)) };
};

export { mapMarketItems };
