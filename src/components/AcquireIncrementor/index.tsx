import { Grid } from "@mui/material";
import IncreaseDecreaseButton from "src/components/Buttons/IncreaseDecreaseButton";

import * as GeneralStyled from "src/styles/styles";

interface Props {
  title: string;
  setValue: (value: number) => void;
  currentValue?: number;
  currency?: number;
  icon?: JSX.Element;
}

const AcquireIncrementor = ({ title, setValue, currency, icon, currentValue }: Props) => {
  return (
    <GeneralStyled.DashedGrid>
      <Grid container columnGap={1}><GeneralStyled.BasicTypography>{title}</GeneralStyled.BasicTypography>
        {currentValue && (<GeneralStyled.BasicTypography>({currentValue})</GeneralStyled.BasicTypography>)}</Grid>

      <Grid container alignItems='center' justifyContent='space-between' mt="10px">
        <Grid item >
          <Grid container columnGap={1} alignItems='center'>
            {icon && <>{icon}</>}
            {currency && (
              <GeneralStyled.BasicTypography>
                {currency}
              </GeneralStyled.BasicTypography>
            )}
          </Grid>
        </Grid>
        <Grid item >
          <IncreaseDecreaseButton setValue={setValue} />
        </Grid>


      </Grid>
    </GeneralStyled.DashedGrid>
  );
};

export default AcquireIncrementor;
