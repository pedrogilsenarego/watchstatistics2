import {useCallback} from "react"
import { useDispatch } from "react-redux";
import { removeCartItem } from "src/redux/Cart/cart.actions";

interface Props {
  cartItems: any
}



const useCompareWatches = ({cartItems}: Props) => {
const dispatch = useDispatch()

  const handleRemoveCartItem = (reference: string) => {
    dispatch(
      removeCartItem({
        reference,
      })
    );
  };


  const handleAction = useCallback(
    (type: string, id: number) => {
      console.log(id)
      switch (type) {
        
        case 'delete': {
          handleRemoveCartItem(cartItems[id].reference)
          break
        }
        default:
          break
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems]
  )

  return {handleAction}
}

export default useCompareWatches