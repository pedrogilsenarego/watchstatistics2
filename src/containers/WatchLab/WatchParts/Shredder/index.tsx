import { Typography, Box, Button } from "@mui/material";
import * as Styled from "./styles";
import {
  LinearProgressBarColor,
  LinearProgressBarColor2,
  LinearProgressBarFormat,
} from "src/Utils/gamyfication";
import { TiDelete } from "react-icons/ti";
import Button3 from "src/components/Buttons/Button3"

interface Props {
  setBagFull: any
  data: any;
  shredderMeter: any;
  openConfirmDelete: any;
  setOpenConfirmDelete: any;
  handleDeleteWatchParts: any;
  list: any;
}

const Shredder = ({ setBagFull, data, shredderMeter,
  openConfirmDelete,
  setOpenConfirmDelete,
  handleDeleteWatchParts,
  list }: Props) => {

  return (
    <>
      {list[2]?.items?.length > 0 && (
        <Typography>Shredded Parts are gone!</Typography>
      )}
      <Typography>SHREDDING - New part that will be obtained:</Typography>
      <Box
        component='div'
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "5px",
        }}
      >
        <Styled.BorderLinearProgress
          backColor={LinearProgressBarColor2(shredderMeter(list[2].items))}
          barColor={LinearProgressBarColor(shredderMeter(list[2].items))}
          variant='determinate'
          value={LinearProgressBarFormat(shredderMeter(list[2].items))}
        />
      </Box>
      {!openConfirmDelete && (
        <Button3
          title="Shred parts"
          onClick={() => {
            setOpenConfirmDelete(true);
          }}
        />
      )}
      {openConfirmDelete && (
        <Button
          onClick={() => {
            setOpenConfirmDelete(false);
            handleDeleteWatchParts(
              list[2].items,
              LinearProgressBarColor(shredderMeter(list[2].items)),
              LinearProgressBarFormat(shredderMeter(list[2].items)),
              LinearProgressBarColor2(shredderMeter(list[2].items))
            );
          }}
        >
          <TiDelete fontSize='3.5em' />
          I, Confirm
        </Button>
      )}
    </>
  );
};

export default Shredder;
