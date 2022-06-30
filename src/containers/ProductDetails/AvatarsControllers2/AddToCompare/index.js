import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/Cart/cart.actions";
import { useHistory } from "react-router-dom";
import { Typography, Avatar, Tooltip } from "@mui/material";
import { BsFillGrid1X2Fill } from "react-icons/bs";

const AddToCompare = ({ product, cartItems, productID, compareWatches }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = (product, cartItems, productID) => {
    if (!product) return;
    if (cartItems.length < 4) {
      product.productID = productID;
      dispatch(addProduct(product));
      history.push("/watchstatistics/comparewatches");
    } else {
      history.push("/watchstatistics/comparewatches");
    }
  };

  const label = compareWatches
    ? [" This watch is already selected, for comparison"]
    : ["Select this watch to compare with other watches"];

  return (
    <>
      <Tooltip arrow placement='top' title={label}>
        <Avatar
          sx={{
            bgcolor: "#00000000",
            border: "solid 3px",
            borderColor: "#ffffff66",
            width: "5vh",
            height: "5vh",
            cursor: "pointer",
          }}
          onClick={() => {
            handleAddToCart(product, cartItems, productID);
          }}
          size='small'
        >
          {compareWatches && (
            <Typography
              style={{
                color: "#ffffff66",
                fontWeight: "800",
              }}
            >
              X
            </Typography>
          )}
          {!compareWatches && (
            <BsFillGrid1X2Fill size='2.5vh' color='#ffffff66' />
          )}
        </Avatar>
      </Tooltip>
    </>
  );
};

export default AddToCompare;
