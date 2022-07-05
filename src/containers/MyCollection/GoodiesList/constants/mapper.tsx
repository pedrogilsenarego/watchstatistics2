import { whatImage } from "src/Utils/gamyfication";
import { priceWatchParts } from "src/Utils/gamyfication";
import { FaCoins } from "react-icons/fa";

const Parts = (p: any,
  pos: number,) => {
  return {
    id: pos,
    name: p.substring(1),
    preview: whatImage(p.substring(1)),
    priceBracket: priceWatchParts(p.charAt(0)),
    sell: [
      {
        buttonType: "icon",
        confirmationRequired: true,
        event: "sell",
        icon: (
          <FaCoins
            fontSize='1.3em'
            color="#ffffffCE"
            style={{ cursor: "pointer" }}
          />
        ),
        label: "Sell part",
        confirmationTitle: "Sell this part",
        confirmationDescription: "Sell this part to the market",
        confirmationButtonLabel: "Accept",
        declineButtonLabel: "Decline",
      }]
  }
}

export const mapParts = (parts: any) => {
  return {
    rows: parts.map((p: any, pos: number) =>
      Parts(p, pos)
    ),
  };
};
