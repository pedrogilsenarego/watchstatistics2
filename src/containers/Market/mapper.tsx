import { MdOutlineGetApp } from "react-icons/md";
import { watchTotalValue } from "src/Utils/gamyfication";

const mapMarketItem = (marketItems: any, pos: number, bagFull: boolean, funds: number) => {
  const handleDisabled = () => {
    if (bagFull)
      return true;
    if (marketItems.price >= funds) return true;
    else return false
  };
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
    rating: (
      (marketItems.generalState +
        marketItems.polishState +
        marketItems.movementState) /
      6
    ).toFixed(1),
    price: marketItems.price,
    buy: [
      {
        buttonType: "icon",
        confirmationRequired: true,
        event: "buy",
        icon: (
          <MdOutlineGetApp
            fontSize='1.3em'
            color={handleDisabled() ? "#ffffff66" : "#ffffffCE"}
            style={{ cursor: "pointer" }}
          />
        ),
        label: "Buy this watch",
        confirmationTitle: "Confirm the purchase",
        confirmationDescription: "Add to your collection this watch",
        confirmationButtonLabel: "Accept",
        declineButtonLabel: "Decline",
        disabled: handleDisabled(),
      },
    ],
  };
};

const mapMarketItems = (marketItems: any, bagFull: boolean, funds: number) => {
  return {
    rows: marketItems.map((p: any, pos: number) => mapMarketItem(p, pos, bagFull, funds)),
  };
};

export { mapMarketItems };
