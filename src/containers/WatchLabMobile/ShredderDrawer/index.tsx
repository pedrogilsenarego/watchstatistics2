import { Grid } from "@mui/material"
import { RiCloseFill } from "react-icons/ri"
import { useSelector } from "react-redux"
import { Redux } from "src/redux/types"
import * as DrawerStyles from "src/styles/drawerStyles"

interface Props {
  setOpenDrawer: (openDrawer: boolean) => void;
}

const ShredderDrawer = ({ setOpenDrawer }: Props) => {
  const watchParts = useSelector<Redux, any>(
    (state) => state.user.currentUser.watchParts
  )
  return (
    <Grid container >
      <Grid item>
        <RiCloseFill
          onClick={() => setOpenDrawer(false)}
          size='2.5em'
          color='lightGrey'
        />
      </Grid>
      <Grid container rowSpacing={2} style={{ marginTop: "10px" }}>
        {watchParts.map((item: string, pos: number) => <Grid
          item
          xs={12}
          key={pos}
        >
          <DrawerStyles.BoxList >
            <DrawerStyles.TypographyList>{item}</DrawerStyles.TypographyList>
          </DrawerStyles.BoxList>
        </Grid>)}
      </Grid>
    </Grid>
  )
}

export default ShredderDrawer