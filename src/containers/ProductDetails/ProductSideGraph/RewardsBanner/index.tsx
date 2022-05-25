import { useState, useEffect } from "react";
import * as Styled from "./styles";
import { useFormikContext } from "formik";
import {
  rewards,
  maxPointsNewProduct,
  maxPointsNewWatchBonusFull,
} from "src/constants/gamification";
import { sumValuesObject } from "src/Utils/math";
import LinearBar from "src/components/ProgressBars/LinearBar";
import { DashedGrid as StyledDashedGrid } from "src/styles/styles";

const RewardsBanner = () => {
  const { values } = useFormikContext<any>();
  const [reward, setReward] = useState(0);

  useEffect(() => {
    const R = {
      productCategoryR: values?.productCategory ? rewards.PRODUCT_CATEGORY : 0,
      productBrandR: values?.productBrand ? rewards.PRODUCT_BRAND : 0,
      productNameR: values?.productName ? rewards.PRODUCT_NAME : 0,
      productRefR: values?.reference ? rewards.PRODUCT_REFERENCE : 0,
      productMovementR: values?.movement ? rewards.PRODUCT_MOVEMENT : 0,
      productCaliberR: values?.caliber ? rewards.PRODUCT_CALIBER : 0,
      productionYearsR:
        values?.productionYearStart && values?.productionYearEnd
          ? rewards.PRODUCT_YEARS
          : 0,
      productCaseSizeR: values?.caseSize ? rewards.PRODUCT_CASE_SIZE : 0,
      productCaseMaterialR: values?.caseMaterial
        ? rewards.PRODUCT_CASE_MATERIAL
        : 0,
      productWaterResR: values?.waterResistance
        ? rewards.PRODUCT_WATER_RESISTANCE
        : 0,
      productPriceR: values?.productPriceBrackets ? rewards.PRODUCT_PRICE : 0,
      productPicturesR:
        values?.productThumbnail.length > 0
          ? rewards.PRODUCT_PICTURE * values?.productThumbnail.length
          : 0,
      productDescriptionR: values?.productDesc
        ? rewards.PRODUCT_DESCRIPTION
        : 0,
      productAdditionalDataR:
        values?.additionalData.length > 0
          ? rewards.PRODUCT_ADDITIONAL_DATA * values?.additionalData.length
          : 0,
    };
    const sum = sumValuesObject(R);
    setReward(
      sum < maxPointsNewProduct ? sum : sum + maxPointsNewWatchBonusFull
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <StyledDashedGrid
      item
      container
      justifyContent='center'
      alignItems='center'
      columnGap={1}
    >
      <LinearBar progress={(reward / maxPointsNewProduct) * 100} />
      <Styled.SecondaryTypography>
        Points Reward: {reward}
      </Styled.SecondaryTypography>
      {reward === maxPointsNewProduct && (
        <Styled.MainTypography>
          + {maxPointsNewWatchBonusFull} Bonus
        </Styled.MainTypography>
      )}
    </StyledDashedGrid>
  );
};

export default RewardsBanner;
