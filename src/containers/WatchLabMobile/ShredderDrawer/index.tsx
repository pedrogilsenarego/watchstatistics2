import { Grid, Box } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Redux } from "src/redux/types";
import * as DrawerStyles from "src/styles/drawerStyles";
import { colorWatchParts, whatImage } from "src/Utils/gamyfication";

interface Props {
  setOpenDrawer: (openDrawer: boolean) => void;
}

const ShredderDrawer = ({ setOpenDrawer }: Props) => {
  const watchParts = useSelector<Redux, string[] | []>(
    (state) => state.user.currentUser.watchParts
  );
  return (
    <Grid container>
      <Grid item>
        <RiCloseFill
          onClick={() => setOpenDrawer(false)}
          size='2.5em'
          color='lightGrey'
        />
      </Grid>
      <Grid container rowSpacing={2} style={{ marginTop: "10px" }}>
        {watchParts.map((item: string, pos: number) => (
          <Grid item xs={12} key={pos}>
            <DrawerStyles.BoxList>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <DrawerStyles.TypographyList>
                  {item.slice(1)}
                </DrawerStyles.TypographyList>
                <Box
                  component='div'
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: colorWatchParts(item),
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    filter: "opacity(1) drop-shadow(2px 2px 5px #00000066)",
                  }}
                >
                  <img
                    src={whatImage(item.slice(1)) || ""}
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      padding: "5px",
                      filter: "opacity(1) drop-shadow(2px 2px 5px red)",
                    }}
                    alt=''
                  />
                </Box>
              </Grid>
            </DrawerStyles.BoxList>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ShredderDrawer;
