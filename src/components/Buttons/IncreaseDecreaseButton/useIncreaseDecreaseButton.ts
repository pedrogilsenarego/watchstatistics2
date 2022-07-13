import { useState, useEffect } from "react"

interface Props {
  setValue: (value: number) => void;
  value: number;
  maxValue?: number;
  incDisabled?: boolean;
}

const useIncreaseDecreaseButton = ({ setValue, value, maxValue, incDisabled }: Props) => {
  const [decreaseDisabled, setDecreaseDisabled] = useState(true)
  const [increaseDisabled, setIncreaseDisabled] = useState(false)

  useEffect(() => {
    setValue(value)
    if (value <= 0) setDecreaseDisabled(true)
    if (maxValue && value >= maxValue) setIncreaseDisabled(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (incDisabled) setIncreaseDisabled(true)
  }, [incDisabled])

  const handleDecrease = () => {
    setValue(value-1)
    setIncreaseDisabled(false)

  };

  const handleIncrease = () => {
    setValue(value+1)
    setDecreaseDisabled(false)
  };


  return { decreaseDisabled, handleDecrease, increaseDisabled, handleIncrease }
}

export default useIncreaseDecreaseButton