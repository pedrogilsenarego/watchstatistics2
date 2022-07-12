import { useState, useEffect } from "react"

interface Props {
  setValue: (value: number) => void;
  maxValue?: number;
  incDisabled?: boolean;
}

const useIncreaseDecreaseButton = ({ setValue, maxValue, incDisabled }: Props) => {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [decreaseDisabled, setDecreaseDisabled] = useState(true)
  const [increaseDisabled, setIncreaseDisabled] = useState(false)

  useEffect(() => {
    setValue(currentNumber)
    if (currentNumber <= 0) setDecreaseDisabled(true)
    if (maxValue && currentNumber >= maxValue) setIncreaseDisabled(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber])

  useEffect(() => {
    if (incDisabled) setIncreaseDisabled(true)
  }, [incDisabled])

  const handleDecrease = () => {
    setCurrentNumber(currentNumber - 1);
    setIncreaseDisabled(false)

  };

  const handleIncrease = () => {
    setCurrentNumber(currentNumber + 1);
    setDecreaseDisabled(false)
  };


  return { decreaseDisabled, handleDecrease, currentNumber, increaseDisabled, handleIncrease }
}

export default useIncreaseDecreaseButton