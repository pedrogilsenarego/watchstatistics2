import { maxPointsNewProduct, maxPointsNewWatchBonusFull } from "src/constants/gamification";
import * as Styled from "./styles";

const RewardsBanner = () => {
  return (
    <Styled.MainBox item container justifyContent='center' alignItems='center'>
      <Styled.MainTypography>Max points possible - All fields: {maxPointsNewProduct} + Bonus: {maxPointsNewWatchBonusFull}</Styled.MainTypography>
    </Styled.MainBox>
  );
};

export default RewardsBanner;
