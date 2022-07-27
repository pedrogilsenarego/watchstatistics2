import * as DrawerStyles from "src/styles/drawerStyles";
import { priceWatchParts } from "src/Utils/gamyfication";
import { Grid } from "@mui/material";
import { useState } from "react";

interface Props {
  item: string[];
}

const Item = ({ item }: Props) => {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <>
      <DrawerStyles.BoxList onClick={() => setOpenInfo(!openInfo)}>
        <Grid container justifyContent='space-between'>
          <DrawerStyles.TypographyList>
            {priceWatchParts(item[0])}
          </DrawerStyles.TypographyList>
          <DrawerStyles.TypographyList>
            {item.length}/5
          </DrawerStyles.TypographyList>
        </Grid>
      </DrawerStyles.BoxList>
      {openInfo && (
        <DrawerStyles.BoxList style={{ marginTop: "5px" }}>
          {item.map((item, pos: number) => (
            <DrawerStyles.TypographyList key={pos} fontSize="16px">
              {item.slice(1)}
            </DrawerStyles.TypographyList>
          ))}
        </DrawerStyles.BoxList>
      )}
    </>
  );
};

export default Item;
