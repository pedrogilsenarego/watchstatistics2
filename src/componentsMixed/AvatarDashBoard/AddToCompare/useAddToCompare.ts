import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redux } from "src/redux/types";
import { addProduct } from "src/redux/Cart/cart.actions";
import { useHistory } from "react-router-dom";
import { generalEndpoints } from "src/constants/endpoints";

interface Props {
  productID: string;
  product: any;
}

const mapState = (state: Redux) => ({
  cartItems: state.cartData.cartItems,
});

const useAddToCompare = ({productID, product}:Props) => {
  const dispatch=useDispatch()
  const history=useHistory()
  const [compareWatches, setCompareWatches] = useState(false)
  const {cartItems} = useSelector(mapState)

  const handleAddToCart = () => {
    if (!product) return;
    if (cartItems.length < 4) {
      product.productID = productID;
      dispatch(addProduct(product));
      history.push(generalEndpoints.COMPARE_WATCHES);
    } else {
      history.push(generalEndpoints.COMPARE_WATCHES);
    }
  };
  
  useEffect(
    () => {    
        if (
          cartItems.length > 3 ||
          cartItems.some((e:any) => e.documentID === productID)
        ) {
          setCompareWatches(true);
        }
      
    },
    // eslint-disable-next-line
    []
  );
  return {
    compareWatches,
    handleAddToCart
  }
}

export default useAddToCompare