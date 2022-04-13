import {
  Grid,
  CardMedia,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as Styled from "./styles";
import { useHistory } from "react-router-dom";
import CircularVotes from "../../../../components/CircularVotes";

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
        justifyContent="center"
        alignItems="center"
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
              <CardMedia
                style={{ borderRadius: "4px", cursor: "pointer" }}
                component="img"
                height="120"
                image={productThumbnail[0]}
                alt={reference}
                onClick={() => {
                  history.push(`/product/${documentID}`);
                }}
              />
            </Grid>
            <Grid item container xs={8}>
              <Grid item container xs={12}>
                <Grid item container xs={8} spacing={1}>
                  <Grid container item spacing={1}>
                    <Grid item>
                      <Typography style={{ color: "#ffffff66" }}>
                        {productName}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{ color: "#ffffff66" }}>
                        {reference}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Votes: {numberVotesNotOwn + numberVotesOwn}
                    </Typography>
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
                            bColor="green"
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            AlreadyVoted
                          </Styled.Button>
                        </Grid>
                      )}
                    {currentUser &&
                      userVotes &&
                      !userVotes.includes(documentID) && (
                        <Grid item>
                          <Styled.Button
                            bColor="red"
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            Not voted
                          </Styled.Button>
                        </Grid>
                      )}
                  </Grid>
                </Grid>
                <Grid item container xs={4} justifyContent="flex-end">
                  <CircularVotes avgTotal={avgTotal} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider
                  style={{
                    width: "75%",
                    background: "#ffffff66",
                    marginTop: "5px",
                  }}
                />
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
            <Grid xs={4} item>
              <CardMedia
                style={{ borderRadius: "4px", cursor: "pointer" }}
                component="img"
                height="120"
                image={productThumbnail[0]}
                alt={reference}
                onClick={() => {
                  history.push(`/product/${documentID}`);
                }}
              />
            </Grid>
            <Grid item container xs={8}>
              <Grid item container xs={12}>
                <Grid item container xs={8} spacing={1}>
                  <Grid item>
                    <Typography>
                      Votes: {numberVotesNotOwn + numberVotesOwn}
                    </Typography>
                  </Grid>

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
                            bColor="green"
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            AlreadyVoted
                          </Styled.ButtonMobile>
                        </Grid>
                      )}
                    {currentUser &&
                      userVotes &&
                      !userVotes.includes(documentID) && (
                        <Grid item>
                          <Styled.ButtonMobile
                            bColor="red"
                            style={{
                              textTransform: "none",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            Not voted
                          </Styled.ButtonMobile>
                        </Grid>
                      )}
                  </Grid>
                </Grid>
                <Grid item container xs={4} justifyContent="flex-end">
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
    <Grid item container justifyContent="center" alignItems="center" xs={12}>
      {!isMatch && renderLaptop()}
      {isMatch && renderMobile()}
    </Grid>
  );
};

export default WatchCard;
