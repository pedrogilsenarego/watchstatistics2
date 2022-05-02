import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import * as Styled from "./styles";
import { useHistory } from "react-router";
import { i18n } from "src/translations/i18n";

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
      <Grid container rowSpacing={1}>
        <Grid container item xs={12} alignItems='center'>
          <Grid item>
            <RiCloseFill
              onClick={() => setMobileDrawer(false)}
              size='2.5em'
              color='lightGrey'
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          onClick={() => handleClickOption("/")}
          style={{ marginTop: "30px" }}
        >
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
          <Styled.Divider />
        </Grid>
        <Grid
          item
          xs={12}
          onClick={() => handleClickOption(`/watchstatistics/watchlaboratory`)}
        >
          <Styled.TypographyTitle>
            {i18n.t("navigation.laboratory")}
          </Styled.TypographyTitle>
        </Grid>
        <Grid
          item
          xs={12}
          onClick={() => handleClickOption(`/watchstatistics/market`)}
        >
          <Styled.TypographyTitle>
            {i18n.t("navigation.market")}
          </Styled.TypographyTitle>
        </Grid>
      </Grid>
    </>
  );
};

export default MobileMainDrawer;
