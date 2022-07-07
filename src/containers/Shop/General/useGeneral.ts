import { useState } from "react"

const useGeneral = () => {
  const [whiteBoxesBuy,setWhiteBoxesBuy] = useState(0)
  return {setWhiteBoxesBuy}
}
export default useGeneral