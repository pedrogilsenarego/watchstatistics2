import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import IncreaseDecreaseButton from "src/components/Buttons/IncreaseDecreaseButton";

import * as GeneralStyled from "src/styles/styles";

interface Props {
  title: string;
  setValue: (value: number) => void;
  currentValue?: number;
  currency?: number;
  icon?: JSX.Element;
  costPerUnit?: number;
}

const AcquireIncrementor = ({
  title,
  setValue,
  currency,
  icon,
  currentValue,
  costPerUnit
}: Props) => {
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (currency && costPerUnit) {
      if (currency < costPerUnit) setDisabled(true)
      else setDisabled(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  return (
    <GeneralStyled.DashedGrid>
      <Grid container columnGap={1}>
        <GeneralStyled.BasicTypography>{title}</GeneralStyled.BasicTypography>
        {currentValue && (
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
            {currency && (
              <Grid item>
                <GeneralStyled.BasicTypography>
                  {currency}
                </GeneralStyled.BasicTypography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <IncreaseDecreaseButton setValue={setValue} incDisabled={disabled} />
        </Grid>
      </Grid>
    </GeneralStyled.DashedGrid>
  );
};

export default AcquireIncrementor;
