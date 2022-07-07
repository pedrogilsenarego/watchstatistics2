import { useState } from "react"

const useShop = () => {
  const [whichMenu, setWhichMenu] = useState("general")
  const [cartItems, setCartItems] = useState(0)

  return { setWhichMenu, whichMenu, cartItems, setCartItems }
}

export default useShop