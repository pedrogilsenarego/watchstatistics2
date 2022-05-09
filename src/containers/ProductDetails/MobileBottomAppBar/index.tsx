import { useState } from "react";
import { Grid } from "@mui/material";
import AvatarsControllers from "../AvatarsControllers2";
import { useSelector } from "react-redux";
import * as Styled from "./styles";
import { i18n } from "src/translations/i18n";
import { MdArrowForwardIos } from "react-icons/md";
import { useHistory } from "react-router-dom";

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
  const { currentUser, latestProducts } = useSelector(mapState);

  const history = useHistory();
  const [currentLatest, setCurrentLatest] = useState(0);
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

  const handleNextWatch = () => {
    if (currentLatest < 12) {
      let i = currentLatest;
      while (i < 12) {
        const nextWatch = latestProducts?.data[i].documentID;
        if (!checkUserHasVoted(nextWatch) && productID !== nextWatch) {
          setCurrentLatest(i);
          history.push(`/product/${nextWatch}`);
          break;
        }
        i++;
      }
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
        <Grid item>
          <MdArrowForwardIos
            onClick={() => handleNextWatch()}
            size='3em'
            color='orange'
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MobileBottomAppBar;
