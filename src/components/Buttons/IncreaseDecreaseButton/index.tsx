import { ButtonGroup } from "@mui/material";
import useIncreaseDecreaseButton from "./useIncreaseDecreaseButton";
import * as Styled from "./styles"

interface Props {
  maxValue?: number;
  setValue: (value: number) => void;
  value?: number;
  incDisabled?: boolean;
}

const IncreaseDecreaseButton = ({ maxValue, setValue, value, incDisabled }: Props) => {
  const {
    decreaseDisabled,
    handleDecrease,
    currentNumber,
    handleIncrease,
    increaseDisabled,
  } = useIncreaseDecreaseButton({ setValue, maxValue, incDisabled });

  return (
    <ButtonGroup>
      <Styled.Button disabled={decreaseDisabled} onClick={handleDecrease} >
        -
      </Styled.Button>
      <Styled.Button>{value ?? currentNumber}</Styled.Button>
      <Styled.Button disabled={increaseDisabled} onClick={handleIncrease}>
        +
      </Styled.Button>
    </ButtonGroup>
  );
};

export default IncreaseDecreaseButton;
