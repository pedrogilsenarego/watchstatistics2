import { Box, Grid } from "@mui/material";
import * as Styled from "./styles";
import {
  LinearProgressBarColor,
  LinearProgressBarColor2,
  LinearProgressBarFormat,
} from "src/Utils/gamyfication";
import Button3 from "src/components/Buttons/Button3";
import * as GeneralStyles from "src/styles/styles";
import useShredder from "./useShredder";

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
  const {
    noPartsError,
    valueFromPart,
    setNoPartsError,
    loadingButton,
    handleShredPart,
  } = useShredder({
    shredderMeter,
    handleDeleteWatchParts,
    list,
    setOpenConfirmDelete,
  });

  return (
    <Grid container rowGap={3}>

      {noPartsError && (
        <Grid item xs={12} style={{ marginTop: "5px" }}>
          <GeneralStyles.BasicTypography fontSize='14px' textAlign='end'>
            Please add at least one part to be shredded
          </GeneralStyles.BasicTypography>
        </Grid>
      )}
      <Grid item container xs={12} style={{ marginTop: "20px" }}>
        <GeneralStyles.DashedGrid
          justifyContent='space-between'
          alignContent='center'
          style={{ display: "flex", width: "100%" }}
        >
          <GeneralStyles.BasicTypography fontSize="16px">
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

      {!openConfirmDelete && list[2]?.items?.length > 0 && (
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
      {list[2]?.items?.length > 0 && (
        <Grid item xs={12}>
          <GeneralStyles.BasicTypography fontSize='14px' textAlign='end' color="orange">
            Attention!: These parts will be lost
          </GeneralStyles.BasicTypography>
        </Grid>
      )}
    </Grid>
  );
};

export default Shredder;
