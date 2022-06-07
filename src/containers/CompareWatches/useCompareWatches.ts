import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "src/redux/Cart/cart.actions";
import { clearCart } from "../../redux/Cart/cart.actions";
import { useHistory } from "react-router";
import { useMediaQuery, useTheme } from "@material-ui/core";

const mapState = (state: any) => ({
  cartItems: state.cartData.cartItems,
});

const useCompareWatches = () => {
  const dispatch = useDispatch();
  const [hide0, setHide0] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const { cartItems } = useSelector(mapState);
  const history = useHistory();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const [list, setList] = useState([]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveCartItem = (reference: string) => {
    dispatch(
      removeCartItem({
        reference,
      })
    );
  };

  const handleToggleView = (pos: number) => {
    if (pos === 0) setHide0(!hide0);
    if (pos === 1) setHide1(!hide1);
    if (pos === 2) setHide2(!hide2);
    if (pos === 3) setHide3(!hide3);
  };

  const handleAction = (type: string, id: number) => {
    switch (type) {
      case "delete": {
        handleRemoveCartItem(cartItems[id].reference);
        break;
      }
      case "show": {
        console.log(id);
        handleToggleView(id);
        break;
      }
      default:
        break;
    }
  };

  return {
    handleAction,
    hide0,
    hide1,
    hide2,
    hide3,
    handleClearCart,
    cartItems,
    history,
    mobile
  };
};

export default useCompareWatches;
