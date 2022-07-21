import {useState} from "react"

const useWatchMobile = () => {
  const [openShredderDrawer, setOpenShredderDrawer] = useState<boolean>(false)
  return {
    openShredderDrawer, setOpenShredderDrawer
  }
}

export default useWatchMobile