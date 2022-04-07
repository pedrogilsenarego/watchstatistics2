import React from "react";
import FacebookShare from "../../forms/socialShare/Facebook";
import WhatsappShareButton from "../../forms/socialShare/Whatsapp";

import AddToBoost from "./AddToBoost";

import Stack from "@mui/material/Stack";

import AddToCompare from "./AddToCompare";

const AvatarsControllers = ({
  product,
  isMatch,
  cartItems,
  productID,
  productBrand,
  productName,
  reference,
  avgTotal,
  compareWatches,
}) => {
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
        direction="row"
        spacing={1}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: isMatch ? "center" : "flex-end",
          paddingTop: isMatch ? "10px" : "0px",
          paddingRight: "10px",
          marginBottom: isMatch ? "10px" : "0px",
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
