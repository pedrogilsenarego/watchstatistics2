
import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as Styled from "./styles";
import { useHistory } from "react-router-dom";
import CircularVotes from "../../../../components/ProgressBars/CircularVotes";
import CardMedia from "src/components/CardMedia";
import AvatarDashboard from "src/componentsMixed/AvatarDashBoard";

const WatchCard = ({
  data,
  currentUser,
  setProductBrands,
  setProductCategory,

  setProductPrices,
  pCategory,
  productPrices,
}: any) => {
  const { userVotes } = currentUser ? currentUser : "null";
  const history = useHistory();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    productThumbnail,
    productName,
    productBrand,
    reference,
    documentID,
    avgTotal,
    productCategory,
    productPriceBrackets,
    numberVotesNotOwn,
    numberVotesOwn,
  } = data;

  const renderLaptop = () => (
    <>
      <Grid
        item
        container
        xs={0.5}
        justifyContent='center'
        alignItems='center'
        style={{
          height: "130px",
        }}
      >
        <Typography
          style={{
            fontSize: "25px",
            fontWeight: 500,
            color: "#ffffff66",
            transform: "rotate(-90deg)",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
          onClick={() => setProductBrands(productBrand)}
        >
          {productBrand.slice(0, 8)}
        </Typography>
      </Grid>
      <Grid item xs={11.5}>
        <Styled.Paper>
          <Grid container spacing={2}>
            <Grid xs={4} item>
              <CardMedia height="120" image={productThumbnail[0]} onClick={() => {
                history.push(`/product/${documentID}`);
              }} />
            </Grid>
            <Grid item container xs={8}>
              <Grid item container xs={12}>
                <Grid item container xs={10}>
                  <Grid container item spacing={1} alignItems="center">

                    <Grid item>
                      <Typography style={{ color: "#ffffff66" }}>
                        {productName}&nbsp;{reference}
                      </Typography>
                    </Grid>

                    <Grid item >
                      <AvatarDashboard productID={documentID} product={data} avatarSize="3.5vh" />
                    </Grid>

                  </Grid>


                  <Grid item container spacing={1}>
                    {!pCategory && (
                      <Grid item>
                        <Styled.Button
                          onClick={() => {
                            setProductCategory(productCategory);
                          }}
                          style={{
                            textTransform: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          {productCategory}
                        </Styled.Button>
                      </Grid>
                    )}
                    {!productPrices && (
                      <Grid item>
                        <Styled.Button
                          onClick={() => {
                            setProductPrices(productPriceBrackets);
                          }}
                          style={{
                            textTransform: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          {productPriceBrackets}
                        </Styled.Button>
                      </Grid>
                    )}

                    {currentUser &&
                      userVotes &&
                      userVotes.includes(documentID) && (
                        <Grid item>
                          <Styled.Button
                            onClick={() => {
                              history.push(`/product/${documentID}`);
                            }}
                            bColor='green'
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            AlreadyVoted ({numberVotesNotOwn + numberVotesOwn})
                          </Styled.Button>
                        </Grid>
                      )}
                    {currentUser &&
                      userVotes &&
                      !userVotes.includes(documentID) && (
                        <Grid item>
                          <Styled.Button
                            onClick={() => {
                              history.push(`/product/${documentID}`);
                            }}
                            bColor='red'
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            Not voted ({numberVotesNotOwn + numberVotesOwn})
                          </Styled.Button>
                        </Grid>
                      )}
                  </Grid>

                </Grid>
                <Grid item container xs={2} justifyContent='center'>

                  <CircularVotes avgTotal={avgTotal} />
                </Grid>
              </Grid>

            </Grid>
          </Grid>

        </Styled.Paper>
      </Grid>
    </>
  );

  const renderMobile = () => (
    <>
      <Grid item xs={12}>
        <Typography
          style={{
            fontSize: "14px",
            color: "#ffffff66",
            marginBottom: "2px",
            fontWeight: 550,
          }}
        >
          {productBrand} {productName} {reference}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Styled.PaperMobile>
          <Grid container spacing={2}>
            <Grid xs={4} item >
              <CardMedia height="120" image={productThumbnail[0]} onClick={() => {
                history.push(`/product/${documentID}`);
              }} />
            </Grid>
            <Grid item container xs={8}>
              <Grid item container xs={12}>
                <Grid item container xs={8} spacing={1}>
                  <Grid item container spacing={1}>
                    {!pCategory && (
                      <Grid item>
                        <Styled.ButtonMobile
                          onClick={() => {
                            setProductCategory(productCategory);
                          }}
                          style={{
                            textTransform: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          {productCategory}
                        </Styled.ButtonMobile>
                      </Grid>
                    )}
                    {!productPrices && (
                      <Grid item>
                        <Styled.ButtonMobile
                          onClick={() => {
                            setProductPrices(productPriceBrackets);
                          }}
                          style={{
                            textTransform: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          {productPriceBrackets}
                        </Styled.ButtonMobile>
                      </Grid>
                    )}

                    {currentUser &&
                      userVotes &&
                      userVotes.includes(documentID) && (
                        <Grid item>
                          <Styled.ButtonMobile
                            onClick={() => {
                              history.push(`/product/${documentID}`);
                            }}
                            bColor='green'
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            AlreadyVoted ({numberVotesNotOwn + numberVotesOwn})
                          </Styled.ButtonMobile>
                        </Grid>
                      )}
                    {currentUser &&
                      userVotes &&
                      !userVotes.includes(documentID) && (
                        <Grid item>
                          <Styled.ButtonMobile
                            onClick={() => {
                              history.push(`/product/${documentID}`);
                            }}
                            bColor='red'
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            Not voted ({numberVotesNotOwn + numberVotesOwn})
                          </Styled.ButtonMobile>
                        </Grid>
                      )}
                  </Grid>
                </Grid>
                <Grid item container xs={4} justifyContent='flex-end'>
                  <Grid item >
                    <AvatarDashboard productID={documentID} product={data} avatarSize="3.5vh" />
                  </Grid>
                  <CircularVotes customSize={60} avgTotal={avgTotal} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Styled.PaperMobile>
      </Grid>
    </>
  );

  return (
    <Grid item container justifyContent='center' alignItems='center' xs={12}>
      {!isMatch && renderLaptop()}
      {isMatch && renderMobile()}
    </Grid>
  );
};

export default WatchCard;
