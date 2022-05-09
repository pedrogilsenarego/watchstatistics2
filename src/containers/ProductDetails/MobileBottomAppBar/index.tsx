import { Grid } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";

interface Props {
  cartItems: any;
  avgTotal: number;
  product: any;
  productID: string;
  productBrand: string;
  productName: string;
  reference: string;
  compareWatches: boolean;
}

const MobileBottomAppBar = ({
  cartItems,
  avgTotal,
  product,
  productID,
  productBrand,
  productName,
  reference,
  compareWatches,
}: Props) => {
  const configAvatarControllers = {
    cartItems,
    avgTotal,
    product,
    productID,
    productBrand,
    productName,
    reference,
    compareWatches,
  };
  return (
    <>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        sx={{
          width: "100%",
          bottom: 0,
          height: "50px",
          position: "fixed",
          backgroundColor: "#18161E",
          zIndex: "1000",
        }}
      >
        <Grid item>
          <AvatarsControllers {...configAvatarControllers} />
        </Grid>
      </Grid>
    </>
  );
};

export default MobileBottomAppBar;
