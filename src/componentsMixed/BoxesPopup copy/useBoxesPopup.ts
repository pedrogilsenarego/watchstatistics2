import {useState} from "react"

const useBoxesPopup = () => {
  const [openPopup, setOpenPopup] = useState(false)
  return {
    openPopup, setOpenPopup
  }
}

export default useBoxesPopup