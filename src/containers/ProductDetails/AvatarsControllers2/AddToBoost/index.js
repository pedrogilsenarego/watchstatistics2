import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooster } from "../../../../redux/Cart/cart.actions";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { AiFillFire } from "react-icons/ai";
import Popover from "../../../../components/Popover";
import { generalEndpoints } from "src/constants/endpoints";

const AddToBoost = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchor, setAnchor] = useState(null);

  const handleAddToBoost = (product) => {
    if (!product) return;
    dispatch(addBooster(product));
    history.push(generalEndpoints.WATCH_LABORATORY);
  };

  return (
    <>
      <Avatar
        sx={{
          bgcolor: "#00000000",
          border: "solid 3px",
          borderColor: "#ffffff66",
          width: "5vh",
          height: "5vh",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          setAnchor(e.currentTarget);
        }}
        onMouseOut={() => {
          setAnchor(null);
        }}
        onClick={() => {
          handleAddToBoost(product);
        }}
      >
        <AiFillFire size='4vh' color='#ffffff66' />
      </Avatar>
      <Popover
        anchor={anchor}
        setAnchor={setAnchor}
        message={[
          " Select this watch for boosting,",
          <br />,
          "check FAQ for more information",
        ]}
      />
    </>
  );
};

export default AddToBoost;
