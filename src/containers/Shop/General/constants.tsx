import { BsCartX } from "react-icons/bs"
import { FaCoins } from "react-icons/fa"

export const menuButtons = (cartItems: number, handleClearCart: () => void) => [
  {
    title: `Clear Cart(${cartItems})`,
    icon: <BsCartX size="1.5em" />,
    onClick: handleClearCart
  },
  {
    title: "Buy",
    icon: <FaCoins size="1.5em" />
  }

]