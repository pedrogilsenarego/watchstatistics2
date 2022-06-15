import Slider from "./Slider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CentralButtons from "./CentralButtons";
import BoxInfo from "./BoxInfo";
import Currencies from "./Currencies";
import WatchParts from "./WatchParts";
import useWatchLab from "./useWatchLab";

const WatchLab = () => {
  const { boxInfoMenu, configCentralButtons, configSlider, configWatchParts } =
    useWatchLab();

  return (
    <>
      <Currencies />
      <Box component="div" style={{ height: "100vh", background: "black" }}>
        <Grid
          container
          alignItems='center'
          style={{ position: "absolute", top: "30%", zIndex: "2" }}
        >
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <CentralButtons {...configCentralButtons} />
          </Grid>
          <Grid item xs={4} justifyContent='center'>
            <BoxInfo typeOfBox={boxInfoMenu} />
          </Grid>
        </Grid>
        <Slider {...configSlider} />
      </Box>

      <Box component="div" style={{ height: "100vh", backgroundColor: "#2d4967" }}>
        <WatchParts {...configWatchParts} />
      </Box>
    </>
  );
};

export default WatchLab;
// #C84E15
// #8686af
