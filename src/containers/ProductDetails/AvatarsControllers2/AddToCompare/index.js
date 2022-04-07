import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/Cart/cart.actions";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import Popover from "../../../../components/Popover";

const AddToCompare = ({ product, cartItems, productID, compareWatches }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);

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
  return (
    <>
      <Avatar
        sx={{
          bgcolor: "#00000000",
          border: "solid 3px",
          borderColor: "#ffffff66",
          width: "6vh",
          height: "6vh",
          cursor: "pointer",
        }}
        onClick={() => {
          handleAddToCart(product, cartItems, productID);
        }}
        onMouseOver={(e) => {
          setAnchor(e.currentTarget);
        }}
        onMouseOut={() => {
          setAnchor(null);
        }}
        size="small"
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
        {!compareWatches && <BsFillGrid1X2Fill size="3vh" color="#ffffff66" />}
      </Avatar>
      <Popover
        anchor={anchor}
        setAnchor={setAnchor}
        message={
          compareWatches
            ? [" This watch is already selected,", <br />, "for comparison"]
            : ["Select this watch to compare", <br />, "with other watches"]
        }
      />
    </>
  );
};

export default AddToCompare;
