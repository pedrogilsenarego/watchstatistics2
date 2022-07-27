import { useState } from "react"

const useWatchMobile = () => {
  const [openShredderDrawer, setOpenShredderDrawer] = useState<boolean>(false)
  const [openFusionDrawer, setOpenFusionDrawer] = useState<boolean>(false)
  return {
    openShredderDrawer, setOpenShredderDrawer,
    openFusionDrawer, setOpenFusionDrawer
  }
}

export default useWatchMobile