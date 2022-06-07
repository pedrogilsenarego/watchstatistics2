import {useCallback, useState} from "react"
import { useDispatch } from "react-redux";
import { removeCartItem } from "src/redux/Cart/cart.actions";

interface Props {
  cartItems: any
}



const useCompareWatches = ({cartItems}: Props) => {
const dispatch = useDispatch()
const [hide0, setHide0] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  console.log(hide0)

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


  const handleAction = useCallback(
    (type: string, id: number) => {
      switch (type) {
        case 'delete': {
          handleRemoveCartItem(cartItems[id].reference)
          break
        }
        case 'show': {
          handleToggleView(id)
          break
        }
        default:
          break
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems]
  )

  return {handleAction, hide0, hide1, hide2, hide3}
}

export default useCompareWatches