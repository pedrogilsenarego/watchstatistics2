import { BsCartX } from "react-icons/bs"
import { FaCoins } from "react-icons/fa"

export const menuButtons = (cartItems: number) => [
  {
    title: `Clear Cart(${cartItems})`,
    icon: <BsCartX size="1.5em" />
  },
  {
    title: "Buy",
    icon: <FaCoins size="1.5em" />
  }

]