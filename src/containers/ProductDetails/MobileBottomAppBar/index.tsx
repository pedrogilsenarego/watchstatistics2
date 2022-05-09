import { Grid, Typography } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import { useSelector } from "react-redux";

interface Props {
  cartItems: any;
  avgTotal: number;
  product: any;
  productID: string;
  productBrand: string;
  productName: string;
  reference: string;
  compareWatches: boolean;
  showVote: boolean;
  setShowVote: (showVote: boolean) => void;
}

const mapState = (state: any) => ({
  currentUser: state.user.currentUser,
});

const MobileBottomAppBar = ({
  cartItems,
  avgTotal,
  product,
  productID,
  productBrand,
  productName,
  reference,
  compareWatches,
  showVote,
  setShowVote,
}: Props) => {
  const { currentUser } = useSelector(mapState);
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
        sx={{
          borderTop: "solid 1px",
          borderColor: "#ffffff66",

          width: "100%",
          bottom: 0,
          height: "50px",
          position: "fixed",
          backgroundColor: "#18161E",
          zIndex: "1000",
        }}
      >
        <Grid item style={{ marginLeft: "10px" }}>
          <AvatarsControllers {...configAvatarControllers} />
        </Grid>
        <Grid item>
          {currentUser && !currentUser.userVotes.includes(productID) && (
            <Typography onClick={() => setShowVote(!showVote)}>Vote</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MobileBottomAppBar;
