import FacebookShare from "../../forms/socialShare/Facebook";
import WhatsappShareButton from "../../forms/socialShare/Whatsapp";

import AddToBoost from "./AddToBoost";

import { Stack, useMediaQuery, useTheme } from "@mui/material";

import AddToCompare from "./AddToCompare";

const AvatarsControllers = ({
  product,
  cartItems,
  productID,
  productBrand,
  productName,
  reference,
  avgTotal,
  compareWatches,
}) => {
  const Theme = useTheme();
  const isMatch = useMediaQuery(Theme.breakpoints.down("sm"));
  const configShareButtons = {
    quote:
      "Vote here on your personal opinion for the " +
      productBrand +
      " " +
      productName +
      " " +
      reference +
      " with a score of " +
      avgTotal,
    url: "https://fir-auth0-9b4cb.web.app/product/" + productID,
  };

  const configAddToCompare = {
    product,
    cartItems,
    productID,
    compareWatches,
  };

  return (
    <div style={{}}>
      {" "}
      <Stack
        direction='row'
        spacing={1}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: isMatch ? "5vh": "6.5vh",
          justifyContent: "flex-end",
        }}
      >
        <>
          <AddToBoost product={product} />
          <AddToCompare {...configAddToCompare} />

          <FacebookShare {...configShareButtons} />
          <WhatsappShareButton {...configShareButtons} />
        </>
      </Stack>
    </div>
  );
};

export default AvatarsControllers;
