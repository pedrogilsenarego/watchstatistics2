import { BsCart, BsCartX } from "react-icons/bs"

export const menuButtons = (cartItems: number, handleClearCart: () => void, handleBuyFromCart: () => void) => [
  {
    title: `Clear Cart`,
    icon: <BsCartX size="1.5em" />,
    onClick: handleClearCart
  },
  {
    title: `Cart(${cartItems})`,
    icon: <BsCart size="1.5em" />,
    onClick: handleBuyFromCart
  }

]