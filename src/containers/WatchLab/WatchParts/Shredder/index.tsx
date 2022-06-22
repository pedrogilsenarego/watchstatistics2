import { Typography, Box, Button } from "@mui/material";
import * as Styled from "./styles";
import {
  LinearProgressBarColor,
  LinearProgressBarColor2,
  LinearProgressBarFormat,
} from "src/Utils/gamyfication";
import useWatchParts from "src/containers/WatchLab/WatchParts/useWatchParts";
import { TiDelete } from "react-icons/ti";

interface Props {
  list: any;
}

const Shredder = ({ list }: Props) => {
  const {
    shredderMeter,
    openConfirmDelete,
    setOpenConfirmDelete,
    handleDeleteWatchParts,
  } = useWatchParts();

  return (
    <>
      {list[2].items.length > 0 && (
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
        <Button
          onClick={() => {
            setOpenConfirmDelete(true);
          }}
        >
          <TiDelete fontSize='3.5em' />
          Shred Parts
        </Button>
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
