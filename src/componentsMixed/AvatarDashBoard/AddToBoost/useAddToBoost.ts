import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBooster } from "src/redux/Cart/cart.actions";
import { generalEndpoints } from "src/constants/endpoints";
import {updateSuccessNotification} from "src/redux/general/general.actions"

interface Props {
  productID:string;
  product: any
}


const useAddToBoost = ({productID, product}:Props) => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  

  const handleAddToBoost = () => {
    if (!product) return;
    const newProduct = product;
    newProduct.productID = productID;
    dispatch(addBooster(newProduct));
    history.push(generalEndpoints.WATCH_LABORATORY);
    dispatch(updateSuccessNotification(`${product.productBrand} ${product.productName} was added for boosting`))
  };
  return {
handleAddToBoost,

  }
}

export default useAddToBoost