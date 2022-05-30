import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import * as Styled from "./styles";
import { useHistory } from "react-router";
import ButtonFilters from "src/components/Buttons/ButtonFilters";
import languages from "src/constants/languages.json";
import { i18n } from "src/translations/i18n";
import { useSelector } from "react-redux";

interface Props {
  setMobileDrawer: (mobileDrawer: boolean) => void;
}

const MobileMainDrawer = ({ setMobileDrawer }: Props) => {
  const history = useHistory();
  const [auth, setAuth] = useState(false);
  const [language, setLanguage] = useState<string | null>("English");
  const mapState = ({ user }: any) => ({
    currentUser: user.currentUser,
  });
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    if (currentUser) setAuth(true);
    else setAuth(false);
  }, [currentUser]);

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
        //onClick={() => handleClickOption(`/watchstatistics/comparewatches`)}
        >
          <Styled.TypographyTitleD>Compare Watches</Styled.TypographyTitleD>
        </Grid>
        {auth && (
          <>
            <Grid
              item
              xs={12}
            //onClick={() => handleClickOption(`/submit-new-watch`)}
            >
              <Styled.TypographyTitleD>Add Watch</Styled.TypographyTitleD>
            </Grid>
            <Grid item xs={12}>
              <Styled.Divider />
            </Grid>
            <Grid
              item
              xs={12}
            // onClick={() =>
            //   handleClickOption(`/watchstatistics/watchlaboratory`)
            // }
            >
              <Styled.TypographyTitleD>
                {i18n.t("navigation.laboratory")}
              </Styled.TypographyTitleD>
            </Grid>
            <Grid
              item
              xs={12}
            //onClick={() => handleClickOption(`/watchstatistics/market`)}
            >
              <Styled.TypographyTitleD>
                {i18n.t("navigation.market")}
              </Styled.TypographyTitleD>
            </Grid>
          </>
        )}

        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <ButtonFilters
            list={languages.options}
            value={language}
            setValue={setLanguage}
            noReset
          />
        </Grid>
        {!auth && (
          <Grid item container justifyContent='center'>
            <Grid item xs={12}>
              <Styled.DividerSmall />
            </Grid>
            <Grid item style={{ marginTop: "5px" }}>
              <Styled.TypographySmaller>
                {i18n.t("drawer.main.loginNotification")}
              </Styled.TypographySmaller>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MobileMainDrawer;
