import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import * as Styled from "./styles";
import {
  LinearProgressBarColor,
  LinearProgressBarColor2,
  LinearProgressBarFormat,
} from "src/Utils/gamyfication";
import Button3 from "src/components/Buttons/Button3";
import * as GeneralStyles from "src/styles/styles";
import { useDispatch } from "react-redux"
import { updateSuccessNotification } from "src/redux/general/general.actions"

interface Props {
  setBagFull: any;
  data: any;
  shredderMeter: any;
  openConfirmDelete: any;
  setOpenConfirmDelete: any;
  handleDeleteWatchParts: any;
  list: any;
}

const Shredder = ({
  shredderMeter,
  openConfirmDelete,
  setOpenConfirmDelete,
  handleDeleteWatchParts,
  list,
}: Props) => {
  const valueFromPart = shredderMeter(list[2].items);
  const [loadingButton, setLoadingButton] = useState(false);
  const [noPartsError, setNoPartsError] = useState(false);
  const dispatch = useDispatch()
  const handleShredPart = async () => {
    setLoadingButton(true);
    try {
      await handleDeleteWatchParts(
        list[2].items,
        LinearProgressBarColor(valueFromPart),
        LinearProgressBarFormat(valueFromPart),
        LinearProgressBarColor2(valueFromPart)
      );
      dispatch(updateSuccessNotification("The parts were shredded into new parts"))
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoadingButton(false);
      setOpenConfirmDelete(false);
    }

  };

  useEffect(() => {
    if (list[2]?.items?.length > 0) setNoPartsError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list[2]?.items]);

  return (
    <Grid container style={{ paddingRight: "15px" }} rowGap={4}>
      {list[2]?.items?.length > 0 && (
        <Grid item xs={12} style={{ marginTop: "5px" }}>
          <GeneralStyles.BasicTypography fontSize='14px' textAlign='end'>
            Attention!: These parts will be lost
          </GeneralStyles.BasicTypography>
        </Grid>
      )}
      {noPartsError && (
        <Grid item xs={12} style={{ marginTop: "5px" }}>
          <GeneralStyles.BasicTypography fontSize='14px' textAlign='end'>
            Please add at least one part to be shredded
          </GeneralStyles.BasicTypography>
        </Grid>
      )}
      <Grid item container xs={12}>
        <GeneralStyles.DashedGrid
          justifyContent='space-between'
          alignContent='center'
          style={{ display: "flex", width: "100%" }}
        >
          <GeneralStyles.BasicTypography>
            New part prediction:
          </GeneralStyles.BasicTypography>
          <Box
            component='div'
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "5px",
            }}
          >
            <Styled.BorderLinearProgress
              backColor={LinearProgressBarColor2(valueFromPart)}
              barColor={LinearProgressBarColor(valueFromPart)}
              variant='determinate'
              value={LinearProgressBarFormat(valueFromPart)}
            />
          </Box>
        </GeneralStyles.DashedGrid>
      </Grid>

      {!openConfirmDelete && (
        <Grid item xs={12} textAlign='end'>
          <Button3
            title='Shred parts'
            onClick={() => {
              list[2]?.items?.length > 0
                ? setOpenConfirmDelete(true)
                : setNoPartsError(true);
            }}
          />
        </Grid>
      )}

      {openConfirmDelete && (
        <Grid item xs={12} textAlign='end'>
          <Button3
            loading={loadingButton}
            title='Confirm'
            onClick={handleShredPart}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Shredder;
