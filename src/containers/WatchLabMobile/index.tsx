import { lazy } from "react"
import * as GeneralStyles from "src/styles/styles";
import { Grid } from "@mui/material";
import { marginStyles } from "src/styles/constants";
import DrawerMine from "src/components/Drawer";
import useWatchMobile from "./useWatchMobile";

const ShredderDrawer = lazy(() => import("./ShredderDrawer"))
const FusionDrawer = lazy(() => import("./FusionDrawer"))

const WatchLabMobile = () => {
  const { openShredderDrawer, setOpenShredderDrawer, openFusionDrawer, setOpenFusionDrawer } = useWatchMobile();

  return (
    <>
      <DrawerMine
        id={0}
        fullHeight
        position='bottom'
        openDrawer={openShredderDrawer}
        setOpenDrawer={setOpenShredderDrawer}

      >
        <ShredderDrawer setOpenDrawer={setOpenShredderDrawer} />
      </DrawerMine>
      <DrawerMine
        id={0}
        fullHeight
        position='bottom'
        openDrawer={openFusionDrawer}
        setOpenDrawer={setOpenFusionDrawer}

      >
        <FusionDrawer setOpenDrawer={setOpenFusionDrawer} />
      </DrawerMine>
      <GeneralStyles.Container mobile>
        <GeneralStyles.Card onClick={() => setOpenShredderDrawer(true)}>
          <Grid container justifyContent='center'>
            <GeneralStyles.TitleTypography>
              Watch Parts Shredder
            </GeneralStyles.TitleTypography>
          </Grid>
        </GeneralStyles.Card>
        <GeneralStyles.Card
          onClick={() => setOpenFusionDrawer(true)}
          style={{ marginTop: marginStyles.MOBILE_CARD_MARGIN_TOP }}
        >
          <Grid container justifyContent='center'>
            <GeneralStyles.TitleTypography>
              Watch Builder
            </GeneralStyles.TitleTypography>
          </Grid>
        </GeneralStyles.Card>
      </GeneralStyles.Container>
    </>
  );
};

export default WatchLabMobile;
