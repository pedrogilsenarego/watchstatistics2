import * as GeneralStyles from "src/styles/styles";
import { Grid } from "@mui/material";
import { marginStyles } from "src/styles/constants";
import DrawerMine from "src/components/Drawer";
import useWatchMobile from "./useWatchMobile";

const WatchLabMobile = () => {
  const { openShredderDrawer, setOpenShredderDrawer } = useWatchMobile();

  return (
    <>
      <DrawerMine
        id={0}
        fullHeight
        position='bottom'
        openDrawer={openShredderDrawer}
        setOpenDrawer={setOpenShredderDrawer}
      >
        Teste
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
