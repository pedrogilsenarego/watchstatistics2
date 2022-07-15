import { ListItems } from "../../types"
import { updateBoxStatus } from "src/redux/User/user.actions";
import { updateSuccessNotification } from "src/redux/general/general.actions";
import { useDispatch, useSelector } from "react-redux";
import {Redux} from "src/redux/types"


interface Props {
  listItems:ListItems,
  handleClearCart: any;
}

const useCartPopup = ({listItems, handleClearCart}:Props) => {
  const dispatch=useDispatch()
  const currentUser = useSelector<Redux, any>(
    (state) => state.user.currentUser
  )

  const handleBuyFromCart = () => {
    const payload = {
      listItems,
      userID: currentUser.id,
      flag: "multipleShop",
    };
    dispatch(updateBoxStatus(payload));
    handleClearCart()
    dispatch(updateSuccessNotification("Your items were acquired"))
  };

  return {
    handleBuyFromCart
  }
}

export default useCartPopup