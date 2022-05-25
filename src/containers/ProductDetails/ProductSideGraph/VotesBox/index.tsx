import * as Styled from "./styles";
import { useSelector } from "react-redux";
import { Redux } from "src/redux/types";
import { useTheme, useMediaQuery, Grid } from "@mui/material";
import CircularVotes from "src/components/ProgressBars/CircularVotes";

interface Props {
  easterEggMotion: boolean;
  setEasterEggMotion: (easterEggMotion: boolean) => void;
}

const VotesBox = ({ easterEggMotion, setEasterEggMotion }: Props) => {
  const mapState = (state: Redux) => ({
    product: state.productsData.product,
  });
  const { product } = useSelector(mapState);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const {
    avgVotationsOwn,
    avgVotationsNotOwn,
    numberVotesOwn,
    numberVotesNotOwn,
    avgTotal,
  } = product;

  return (
    <Styled.MainBox
      mobile={mobile}
      item
      container
      justifyContent='center'
      alignItems='center'
    >
      {!mobile && (
        <Grid item xs={6} textAlign="center">
          <CircularVotes avgTotal={avgTotal} />
        </Grid>
      )}
      <Grid item container xs={12} sm={6} justifyContent="space-between">
        <Grid item xs={mobile ? 6 : 0}>
          <Styled.MainTypography
            onClick={() => {
              setEasterEggMotion(!easterEggMotion);
            }}
          >
            Own/Experimented: {avgVotationsOwn}
          </Styled.MainTypography>
        </Grid>
        <Grid item xs={mobile ? 6 : 0}>
          <Styled.SecondaryTypography>
            {" "}
            Votes: {numberVotesOwn}
          </Styled.SecondaryTypography>
        </Grid>
        <Grid item xs={mobile ? 6 : 0}>
          <Styled.MainTypography>
            Only Seen Digital: {avgVotationsNotOwn}
          </Styled.MainTypography>
        </Grid>
        <Grid item xs={mobile ? 6 : 0}>
          <Styled.SecondaryTypography>
            Votes: {numberVotesNotOwn}
          </Styled.SecondaryTypography>
        </Grid>
      </Grid>
    </Styled.MainBox>
  );
};

export default VotesBox;
