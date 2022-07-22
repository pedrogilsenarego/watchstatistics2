import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Redux } from "src/redux/types";
import Item from "./Item";
import useShredderDrawer from "./useShredderDrawer";
import {
  shredderMeter,
  LinearProgressBarColor,
  LinearProgressBarColor2,
  LinearProgressBarFormat,
} from "src/Utils/gamyfication";
import CircularVotes from "src/components/ProgressBars/CircularVotes";
import * as GeneralStyles from "src/styles/styles";
import MobileBottomAppBar from "src/components/MobileBottomAppBar"
import { listButtons } from "./constants"

interface Props {
  setOpenDrawer: (openDrawer: boolean) => void;
}

const ShredderDrawer = ({ setOpenDrawer }: Props) => {
  const watchParts = useSelector<Redux, string[] | []>(
    (state) => state.user.currentUser.watchParts
  );
  const { handleAddToList, listShred, handleClearList } = useShredderDrawer();
  const shredValue = shredderMeter(listShred) ?? 0;

  return (
    <>
      <div style={{ marginLeft: "-10px" }}>
        <MobileBottomAppBar listButtons={listButtons(handleClearList)} />
      </div>
      <Grid container>
        <Grid
          container
          justifyContent='space-between'
          style={{
            marginTop: "-10px",
            position: "fixed",
            zIndex: 20,
            backgroundColor: "#18161E",
            paddingBottom: "10px",
            paddingTop: "10px"
          }}
        >
          <Grid item xs={4}>
            <RiCloseFill
              onClick={() => setOpenDrawer(false)}
              size='2.5em'
              color='lightGrey'
            />
          </Grid>
          <Grid
            item
            xs={8}
            container
            justifyContent='space-around'
            alignItems='center'
          >
            <GeneralStyles.BasicTypography>
              Part Prediction:{" "}
            </GeneralStyles.BasicTypography>
            <CircularVotes
              avgTotal={(LinearProgressBarFormat(shredValue) || 0) / 10}
              color={LinearProgressBarColor(shredValue)}
              secondColor={LinearProgressBarColor2(shredValue)}
              hideAvgTotal
              customSize={40}
              thickness={8}
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} style={{ marginTop: "40px" }}>
          {watchParts.map((item: string, pos: number) => (
            <Grid item xs={12} key={pos}>
              <Item item={item} handleAddToList={handleAddToList} listShred={listShred} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ShredderDrawer;
