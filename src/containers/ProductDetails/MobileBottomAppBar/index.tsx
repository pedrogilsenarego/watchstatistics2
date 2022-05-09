import { Grid } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import { useSelector, useDispatch } from "react-redux";
import * as Styled from "./styles";
import { i18n } from "src/translations/i18n";
import { MdArrowForwardIos } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { setCurrentLatestProduct } from "src/redux/Products/products.actions";

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
  latestProducts: state.productsData.latestProducts,
  currentLatestProduct: state.productsData.currentLatestProduct,
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
  const { currentUser, latestProducts, currentLatestProduct } =
    useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
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
  const checkUserHasVoted = (documentID: string) => {
    if (currentUser.userVotes.includes(documentID)) return true;
    else return false;
  };

  console.log(currentLatestProduct);

  const handleNextWatch = () => {
    let i = currentLatestProduct ?? 0;
    while (i <= 11) {
      console.log(i);
      const nextWatch = latestProducts?.data[i].documentID;
      console.log(nextWatch);
      if (!checkUserHasVoted(nextWatch) && productID !== nextWatch) {
        dispatch(setCurrentLatestProduct(i));
        history.push(`/product/${nextWatch}`);
        break;
      }
      if (i === 11) i = 0;
      else i++;
    }
  };
  return (
    <>
      <Grid
        container
        alignItems='center'
        justifyContent='space-between'
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
            <Styled.Typography onClick={() => setShowVote(!showVote)}>
              {i18n.t("navigation.mobileBottomAppbar.vote")}
            </Styled.Typography>
          )}
        </Grid>
        {latestProducts?.data?.length >= 1 && (
          <Grid item>
            <MdArrowForwardIos
              onClick={() => handleNextWatch()}
              size='3em'
              color='orange'
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MobileBottomAppBar;
