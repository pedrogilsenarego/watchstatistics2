import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import { useSelector, useDispatch } from "react-redux";
import { i18n } from "src/translations/i18n";
import { MdArrowForwardIos } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { setCurrentLatestProduct } from "src/redux/Products/products.actions";
import DrawerMine from "src/components/Drawer";
import MobileSecondaryDrawer from "src/containers/Header/MobileSecondaryDrawer";
import { ImPlus } from "react-icons/im";
import { MdHowToVote } from "react-icons/md";
import { BsWatch } from "react-icons/bs"

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
  newWatch: boolean;
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
  newWatch
}: Props) => {
  const { currentUser, latestProducts, currentLatestProduct } =
    useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [mobileDrawerSecondary, setMobileDrawerSecondary] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
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
    if (currentUser?.userVotes.includes(documentID)) return true;
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

  const renderBottomButtons = () => (
    <>
      <Grid item xs={4} textAlign='center'>
        <MdHowToVote
          onClick={() =>
            currentUser
              ? checkUserHasVoted(productID)
                ? null
                : setShowVote(!showVote)
              : setMobileDrawerSecondary(true)
          }
          size='1.6em'
          color={
            checkUserHasVoted(productID) || !currentUser
              ? "#ffffff66"
              : "orange"
          }
        />
        <Typography style={{ marginTop: "-1px", color: "lightGrey" }}>
          {currentUser
            ? checkUserHasVoted(productID)
              ? i18n.t("navigation.mobileBottomAppbar.voted")
              : i18n.t("navigation.mobileBottomAppbar.vote")
            : i18n.t("navigation.mobileBottomAppbar.loginVote")}
        </Typography>
      </Grid>
      <Grid item textAlign='center' xs={4}>
        <ImPlus
          onClick={() => setShowOptions(true)}
          size='1.6em'
          color='orange'
        />
        <Typography style={{ marginTop: "-1px", color: "lightGrey" }}>
          {i18n.t("navigation.mobileBottomAppbar.options")}
        </Typography>
      </Grid>
      <Grid item xs={4} textAlign='center'>
        {currentUser && checkUserHasWatchesForVote() && (
          <MdArrowForwardIos
            onClick={() => handleNextWatch()}
            size='2em'
            color='orange'
          />
        )}
        {!currentUser && <MdArrowForwardIos size='2em' color='grey' />}
        {currentUser && !checkUserHasWatchesForVote() && (
          <MdArrowForwardIos size='2em' color='grey' />
        )}
        <Typography style={{ marginTop: "-4px", color: "lightGrey" }}>
          {i18n.t("navigation.mobileBottomAppbar.next")}
        </Typography>
      </Grid>
    </>
  )

  const renderNewWatchBottomApp = () => (
    <Grid item xs={12} textAlign='center'>
      <BsWatch
        size='1.6em'
        color="orange"

      />
      <Typography style={{ marginTop: "-1px", color: "lightGrey" }}>
        {i18n.t("navigation.mobileBottomAppbar.submitWatch")
        }
      </Typography>
    </Grid>
  )

  return (
    <Grid
      container
      alignItems='center'
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
      {newWatch ? renderNewWatchBottomApp() : renderBottomButtons()}
      <DrawerMine
        id={0}
        fullHeight
        fullWidth
        position='right'
        openDrawer={mobileDrawerSecondary}
        setOpenDrawer={setMobileDrawerSecondary}
      >
        <MobileSecondaryDrawer setMobileDrawer={setMobileDrawerSecondary} />
      </DrawerMine>
      <DrawerMine
        position='bottom'
        topRadius
        id={0}
        fullWidth
        openDrawer={showOptions}
        setOpenDrawer={setShowOptions}
      >
        <AvatarsControllers {...configAvatarControllers} />
      </DrawerMine>
    </Grid>
  );
};

export default MobileBottomAppBar;
