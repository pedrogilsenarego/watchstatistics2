import { Grid, CardMedia, Typography, Divider } from "@mui/material";
import * as Styled from "./styles";
import CircularProgress from "./CircularProgress";
import { useHistory } from "react-router-dom";

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

  return (
    <Grid item container justifyContent="center" alignItems="center" xs={12}>
      <Grid
        item
        container
        xs={0.7}
        justifyContent="center"
        alignItems="center"
        style={{
          height: "150px",
        }}
      >
        <Typography
          style={{
            fontSize: "30px",
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
      <Grid item xs={11.3}>
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
                  <CircularProgress avgTotal={avgTotal} />
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
    </Grid>
  );
};

export default WatchCard;
