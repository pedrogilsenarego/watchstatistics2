
import { Grid } from "@mui/material";
import IncreaseDecreaseButton from "src/components/Buttons/IncreaseDecreaseButton";
import BoxesPopup from "src/componentsMixed/BoxesPopup";
import useAcquireIncrementor from "./useAcquireIncrementor";

import * as GeneralStyled from "src/styles/styles";

interface Props {
  title: string;
  setValue: (value: number) => void;
  value: number;
  currentValue?: number;
  currency?: number;
  icon?: JSX.Element;
  costPerUnit?: number;
  typeOfBox: string;
}

const AcquireIncrementor = ({
  title,
  setValue,
  value,
  currency,
  icon,
  currentValue,
  costPerUnit,
  typeOfBox
}: Props) => {

  const { disabled, helperPopup, setHelperPopup } = useAcquireIncrementor({ currency, costPerUnit })


  return (
    <>
      <BoxesPopup openPopup={helperPopup} setOpenPopup={setHelperPopup} title={title} typeOfBox={typeOfBox} />
      <GeneralStyled.DashedGrid>
        <Grid container columnGap={1}>
          <GeneralStyled.BasicTypography onClick={() => setHelperPopup(true)}>{title}</GeneralStyled.BasicTypography>
          {(currentValue || currentValue === 0) && (
            <GeneralStyled.BasicTypography>
              ({currentValue})
            </GeneralStyled.BasicTypography>
          )}
        </Grid>

        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          mt='10px'
        >
          <Grid item>
            <Grid container columnGap={1} alignItems='center'>
              {icon && <Grid item>{icon}</Grid>}
              {(currency || currency === 0) && (
                <Grid item>
                  <GeneralStyled.BasicTypography>
                    {currency}
                  </GeneralStyled.BasicTypography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <IncreaseDecreaseButton setValue={setValue} value={value} incDisabled={disabled} />
          </Grid>
        </Grid>
      </GeneralStyled.DashedGrid>
    </>
  );
};

export default AcquireIncrementor;
