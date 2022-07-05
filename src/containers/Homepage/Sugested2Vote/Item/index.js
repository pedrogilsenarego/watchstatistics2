import React from "react";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";
import CardMedia from "src/components/CardMedia";
import { useTheme, useMediaQuery } from "@mui/material";

const Item = ({ item }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  return (
    <>
      <CardMedia
        style={{ cursor: "pointer" }}
        borderRadius='0px'
        height={mobile ? "90px" : "100px"}
        image={item.productThumbnail?.[0] ?? ""}
        alt={item.productName}
        onClick={() => history.push(`/product/${item.documentID}`)}
      />

      <Typography
        fontSize={"12px"}
        style={{ marginTop: "5px", fontWeight: "500" }}
      >
        {item.productBrand} {item.productName}: {item.reference}
      </Typography>
      <Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
        Votes: {item.numberVotesOwn + item.numberVotesNotOwn} . Score:{" "}
        {item.avgTotal}
      </Typography>
      <Typography fontSize={"12px"} style={{ color: "#ffffff66" }}>
        {item.userID}
      </Typography>
    </>
  );
};

export default Item;
