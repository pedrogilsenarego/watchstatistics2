import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import * as Styled from "./styles";
import { useHistory } from "react-router";

interface Props {
  setMobileDrawer: (mobileDrawer: boolean) => void;
}

const MobileMainDrawer = ({ setMobileDrawer }: Props) => {
  const history = useHistory();
  function handleClickOption(url: string) {
    setMobileDrawer(false);
    history.push(url);
    return;
  }
  return (
    <>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item>
            <RiCloseFill
              onClick={() => setMobileDrawer(false)}
              size='2.5em'
              color='lightGrey'
            />
          </Grid>
        </Grid>
        <Grid item xs={12} onClick={() => handleClickOption("/")}>
          <Styled.TypographyTitle>Home</Styled.TypographyTitle>
        </Grid>
        <Grid item xs={12} onClick={() => handleClickOption(`/browse`)}>
          <Styled.TypographyTitle>Browse</Styled.TypographyTitle>
        </Grid>
        <Grid
          item
          xs={12}
          onClick={() => handleClickOption(`/watchstatistics/addwatch`)}
        >
          <Styled.TypographyTitle>Add Watch</Styled.TypographyTitle>
        </Grid>
        <Grid
          item
          xs={12}
          onClick={() => handleClickOption(`/watchstatistics/comparewatches`)}
        >
          <Styled.TypographyTitle>Compare Watches</Styled.TypographyTitle>
        </Grid>
        <Grid item xs={12}>
          <Styled.TypographyTitle
            onClick={() =>
              handleClickOption(`/watchstatistics/watchlaboratory`)
            }
          >
            Watch Laboratory
          </Styled.TypographyTitle>
        </Grid>
        <Grid
          item
          xs={12}
          onClick={() => handleClickOption(`/watchstatistics/market`)}
        >
          <Styled.TypographyTitle>Market</Styled.TypographyTitle>
        </Grid>
      </Grid>
    </>
  );
};

export default MobileMainDrawer;
