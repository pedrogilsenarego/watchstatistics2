import { ButtonGroup } from "@mui/material";
import useIncreaseDecreaseButton from "./useIncreaseDecreaseButton";
import * as Styled from "./styles"

interface Props {
  maxValue?: number;
  setValue: (value: number) => void;
  value: number;
  incDisabled?: boolean;
}

const IncreaseDecreaseButton = ({ maxValue, setValue, value, incDisabled }: Props) => {
  const {
    decreaseDisabled,
    handleDecrease,
    handleIncrease,
    increaseDisabled,
  } = useIncreaseDecreaseButton({ setValue, value, maxValue, incDisabled });

  return (
    <ButtonGroup>
      <Styled.Button disabled={decreaseDisabled} onClick={handleDecrease} >
        -
      </Styled.Button>
      <Styled.Button>{value}</Styled.Button>
      <Styled.Button disabled={increaseDisabled} onClick={handleIncrease}>
        +
      </Styled.Button>
    </ButtonGroup>
  );
};

export default IncreaseDecreaseButton;
