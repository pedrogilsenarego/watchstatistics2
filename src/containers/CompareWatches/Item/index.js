import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { TableCell, TableRow } from "@material-ui/core";
import { useHistory } from "react-router";
import { VscGraph } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import { BiHide } from "react-icons/bi";

import { removeCartItem } from "../../../redux/Cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: "50px",
    width: "80px",
    borderRadius: "3px",
  },
}));

const Item = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [view, setView] = useState(false);
  const { productName, productThumbnail, reference, productBrand, productID } =
    product;
  const classes = useStyles();

  const handleRemoveCartItem = (reference) => {
    dispatch(
      removeCartItem({
        reference,
      })
    );
  };

  return (
    <TableRow style={{ cursor: "pointer" }} key={productName}>
      <TableCell
        align="left"
        onClick={() => history.push(`/product/${productID}`)}
      >
        <Box className={classes.root} alt={productName}>
          <CardMedia className={classes.media} image={productThumbnail[0]} />
        </Box>
      </TableCell>
      <TableCell
        align="left"
        onClick={() => history.push(`/product/${productID}`)}
      >
        {productBrand} - {productName} - {reference}
      </TableCell>
      <TableCell align="center">
        <VscGraph color={product.color} style={{}} fontSize="1.5em" />{" "}
      </TableCell>
      <TableCell align="center">
        <BiHide
          color={!view ? "#ffffff66" : "#ffffff"}
          style={{}}
          fontSize="1.5em"
          onClick={() => {
            product.handleToggleView(product.pos);
            setView(!view);
          }}
        />{" "}
      </TableCell>
      <TableCell align="center">
        <ImCross
          fontSize="1em"
          onClick={() => handleRemoveCartItem(reference)}
        />{" "}
      </TableCell>
    </TableRow>
  );
};

export default Item;
