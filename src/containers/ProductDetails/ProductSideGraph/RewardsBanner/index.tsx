import { useState, useEffect } from "react";
import {
  maxPointsNewProduct,
  maxPointsNewWatchBonusFull,
} from "src/constants/gamification";
import * as Styled from "./styles";
import { useFormikContext } from "formik";
import { rewards } from "src/constants/gamification";
import { sumValuesObject } from "src/Utils/math";

const RewardsBanner = () => {
  const { values } = useFormikContext<any>()
  const [reward, setReward] = useState(0);


  useEffect(() => {
    const R = {
      productCategoryR: values?.productCategory ? rewards.PRODUCT_CATEGORY : 0,
      productBrandR: values?.productBrand ? rewards.PRODUCT_BRAND : 0,
      productNameR: values?.productName ? rewards.PRODUCT_NAME : 0,
      productRefR: values?.reference ? rewards.PRODUCT_REFERENCE : 0,
      productMovementR: values?.movement ? rewards.PRODUCT_MOVEMENT : 0,
      productCaliberR: values?.caliber ? rewards.PRODUCT_CALIBER : 0,

    }

    setReward(sumValuesObject(R))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <Styled.MainBox item container justifyContent='center' alignItems='center' columnGap={2}>
      <Styled.MainTypography>Reward: {reward}</Styled.MainTypography>
      <Styled.MainTypography>
        Max points possible - All fields: {maxPointsNewProduct} + Bonus:{" "}
        {maxPointsNewWatchBonusFull}
      </Styled.MainTypography>
    </Styled.MainBox>
  );
};

export default RewardsBanner;
