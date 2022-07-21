import { useState } from "react";
import * as DrawerStyles from "src/styles/drawerStyles";
import { Grid, Box } from "@mui/material";
import { colorWatchParts, whatImage } from "src/Utils/gamyfication";

interface Props {
  item: string;
  handleAddToList: (item: string, action: "add" | "remove") => void
}

const Item = ({ item, handleAddToList }: Props) => {
  const [checked, setChecked] = useState<boolean>(false)
  return (
    <DrawerStyles.BoxList onClick={() => {
      setChecked(!checked);
      handleAddToList(item, !checked ? "add" : "remove")
    }} backgroundColor={checked ? "darkGrey" : null}>
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
            backgroundColor: checked ? "#00000066" : colorWatchParts(item),
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
  )
}
export default Item