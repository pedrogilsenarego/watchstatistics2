import { useState, useEffect } from "react";

interface Props {
  currency?: number;
  costPerUnit?: number;
}

const useAcquireIncrementor = ({currency, costPerUnit}:Props) => {
  const [disabled, setDisabled] = useState(false)
  const [helperPopup, setHelperPopup] = useState(false)
  useEffect(() => {
    if (currency && costPerUnit) {
      if (currency < costPerUnit) setDisabled(true)
      else setDisabled(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  return {
    disabled,
    helperPopup, setHelperPopup
  }
}

export default useAcquireIncrementor