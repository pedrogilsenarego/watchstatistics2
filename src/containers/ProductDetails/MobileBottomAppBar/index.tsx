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
  const checkUserHasWatchesForVote = () => {
    var b = 0;
    for (let i = 0; i < latestProducts.data.length; i++) {
      const nextWatch = latestProducts?.data[i].documentID;
      if (!checkUserHasVoted(nextWatch)) {
        b = b + 1;
      }
    }
    if (b > 1) return true;
    else return false;
  };

  const checkUserHasVoted = (documentID: string) => {
    if (currentUser.userVotes.includes(documentID)) return true;
    else return false;
  };

  const handleNextWatch = () => {
    let i = currentLatestProduct ?? 0;
    while (i <= 11) {
      const nextWatch = latestProducts?.data[i].documentID;
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
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      sx={{
        borderTop: "solid 1px",
        borderColor: "#ffffff66",
        width: "100%",
        bottom: 0,
        height: "55px",
        position: "fixed",
        backgroundColor: "black",
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
        {currentUser && currentUser.userVotes.includes(productID) && (
          <Styled.TypographyDisabled>
            {i18n.t("navigation.mobileBottomAppbar.voted")}
          </Styled.TypographyDisabled>
        )}
        {!currentUser && (
          <Styled.TypographyLogin onClick={() => setShowVote(!showVote)}>
            {i18n.t("navigation.mobileBottomAppbar.loginVote")}
          </Styled.TypographyLogin>
        )}
      </Grid>
      {currentUser && checkUserHasWatchesForVote() && (
        <Grid item>
          <MdArrowForwardIos
            onClick={() => handleNextWatch()}
            size='3em'
            color='orange'
          />
        </Grid>
      )}
      {!currentUser && (
        <Grid item>
          <MdArrowForwardIos size='3em' color='grey' />
        </Grid>
      )}
      {currentUser && !checkUserHasWatchesForVote() && (
        <Grid item>
          <MdArrowForwardIos size='3em' color='grey' />
        </Grid>
      )}
    </Grid>
  );
};

export default MobileBottomAppBar;
