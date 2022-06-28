import { MdOutlineGetApp } from "react-icons/md";
import { watchTotalValue } from "src/Utils/gamyfication";

const mapMarketItem = (
  marketItems: any,
  pos: number,
  bagFull: boolean,
  funds: number
) => {
  const handleDisabled = () => {
    if (bagFull) return { message: "Your collection is full", status: true };
    if (marketItems.price >= funds) return { message: "You dont have enough funds", status: true };
    else return { message: "Buy this watch", status: false }
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
            color={handleDisabled().status ? "#ffffff66" : "#ffffffCE"}
            style={{ cursor: "pointer" }}
          />
        ),
        label: handleDisabled().message,
        confirmationTitle: "Confirm the purchase",
        confirmationDescription: "Add this watch to your collection",
        confirmationButtonLabel: "Accept",
        declineButtonLabel: "Decline",
        disabled: handleDisabled().status,
      },
    ],
  };
};

const mapMarketItems = (marketItems: any, bagFull: boolean, funds: number) => {
  return {
    rows: marketItems.map((p: any, pos: number) =>
      mapMarketItem(p, pos, bagFull, funds)
    ),
  };
};

export { mapMarketItems };
