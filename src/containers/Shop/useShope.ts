import { useState } from "react"

const useShop = () => {
  const [whichMenu, setWhichMenu] = useState("general")

  return { setWhichMenu, whichMenu }
}

export default useShop