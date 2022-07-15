import Popup from "src/components/Popup";
import { ListItems } from "../../types";
import { Grid } from "@mui/material"
import * as GeneralStyles from "src/styles/styles";
import useCartPopup from "./useCartPopup";
import { getShopNames, getShopCurrencyTypes } from "src/constants/gamification";
import { actions } from "./constants"

interface Props {
  setOpenPopup: (openPopup: boolean) => void;
  openPopup: boolean;
  listItems: ListItems;
  handleClearCart: any;
}

const CartPopup = ({
  setOpenPopup,
  openPopup,
  listItems,
  handleClearCart,
}: Props) => {
  const { handleBuyFromCart } = useCartPopup({ listItems, handleClearCart });
  return (
    <>
      <Popup
        actions={actions(handleBuyFromCart, setOpenPopup)}
        title='Cart'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <>

          {Object.keys(listItems).map((item, key) => {
            return (
              <Grid container justifyContent="space-between" alignItems="center" key={key}>
                <GeneralStyles.BasicTypography >
                  {getShopNames(item)} ({listItems[item].value})
                </GeneralStyles.BasicTypography>
                <GeneralStyles.BasicTypography >

                  {-listItems[item].currency}&nbsp;
                  {getShopCurrencyTypes(listItems[item].typeCurrency)}
                </GeneralStyles.BasicTypography>
              </Grid>
            );
          })}
        </>
      </Popup>
    </>
  );
};

export default CartPopup;
