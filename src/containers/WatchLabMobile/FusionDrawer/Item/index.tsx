import * as DrawerStyles from "src/styles/drawerStyles";
import { priceWatchParts, numberToLetter } from "src/Utils/gamyfication";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import CardMedia from "src/components/CardMedia"


interface Props {
  item: string[];
  pos: number;
  cartBooster: any;
}

const Item = ({ item, pos, cartBooster }: Props) => {
  const [openInfo, setOpenInfo] = useState(false);

  const numberParsed = numberToLetter(pos)

  const renderBooster = () => {
    return (
      <>
        <Typography>Boosting: {cartBooster?.[numberParsed].productBrand} {cartBooster?.[numberParsed].productName}</Typography>
        <CardMedia image={cartBooster?.[numberParsed]?.productThumbnail[0]} />
      </>
    )
  }



  return (
    <>
      <DrawerStyles.BoxList onClick={() => setOpenInfo(!openInfo)}>
        <Grid container justifyContent='space-between'>
          <DrawerStyles.TypographyList color={item.length < 5 ? "grey" : undefined}>
            {priceWatchParts(item[0])}
          </DrawerStyles.TypographyList>
          <DrawerStyles.TypographyList color={item.length < 5 ? "grey" : undefined}>
            {item.length}/5
          </DrawerStyles.TypographyList>
        </Grid>
      </DrawerStyles.BoxList>
      {openInfo && (
        <DrawerStyles.BoxList style={{ marginTop: "5px" }}>
          <Grid container >
            <Grid item xs={6}>
              {item.map((item, pos: number) => (

                <DrawerStyles.TypographyList key={pos} fontSize="16px">
                  {item.slice(1)}
                </DrawerStyles.TypographyList>

              ))}
            </Grid>
            <Grid item xs={6}>
              {cartBooster?.[numberParsed] ? renderBooster() : <>"No watch chosen for boosting"</>}
            </Grid>
          </Grid>
        </DrawerStyles.BoxList>
      )}
    </>
  );
};

export default Item;
