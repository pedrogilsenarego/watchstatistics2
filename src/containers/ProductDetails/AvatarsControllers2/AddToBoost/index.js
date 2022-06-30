import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooster } from "../../../../redux/Cart/cart.actions";
import { useHistory } from "react-router-dom";
import { Avatar, Tooltip } from "@mui/material";
import { AiFillFire } from "react-icons/ai";
import { generalEndpoints } from "src/constants/endpoints";

const AddToBoost = ({ product, productID }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);

  const handleAddToBoost = () => {
    if (!product) return;
    const newProduct = product;
    newProduct.productID = productID;
    dispatch(addBooster(newProduct));
    history.push(generalEndpoints.WATCH_LABORATORY);
  };

  const label = "Select this watch for boosting";

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
            handleAddToBoost();
          }}
        >
          <AiFillFire size='3.5vh' color='#ffffff66' />
        </Avatar>
      </Tooltip>
    </>
  );
};

export default AddToBoost;
