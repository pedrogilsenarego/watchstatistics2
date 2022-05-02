import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import * as Styled from "./styles";
import { useHistory } from "react-router";
import { i18n } from "src/translations/i18n";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "src/redux/User/user.actions";
import { checkUserIsAdmin } from "src/Utils";

interface Props {
  setMobileDrawer: (mobileDrawer: boolean) => void;
}

const MobileMainDrawer = ({ setMobileDrawer }: Props) => {
  const mapState = ({ user }: any) => ({
    currentUser: user.currentUser,
  });
  const { currentUser } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  function handleClickOption(url: string) {
    setMobileDrawer(false);
    history.push(url);
    return;
  }

  const handleSignOut = () => {
    dispatch(signOutUserStart());
  };

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
          onClick={() => handleClickOption("/mycollection")}
          style={{ marginTop: "30px" }}
        >
          <Styled.TypographyTitle>
            {i18n.t("navigation.myCollection")}
          </Styled.TypographyTitle>
        </Grid>
        <Grid item xs={12} onClick={() => handleClickOption(`/dashboard`)}>
          <Styled.TypographyTitle>
            {i18n.t("navigation.dashboard")}
          </Styled.TypographyTitle>
        </Grid>
        <Grid item xs={12}>
          <Styled.Divider />
        </Grid>
        <Grid
          item
          xs={12}
          onClick={() => {
            handleSignOut();
            handleClickOption(`/`);
          }}
        >
          <Styled.TypographyTitle>
            {i18n.t("navigation.logout")}
          </Styled.TypographyTitle>
        </Grid>
        {checkUserIsAdmin(currentUser) && (
          <Grid
            item
            xs={12}
            style={{ marginTop: "280px" }}
            onClick={() => {
              handleClickOption(`/admin`);
            }}
          >
            <Styled.TypographyTitleAdmin>
              {i18n.t("navigation.admin")}
            </Styled.TypographyTitleAdmin>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MobileMainDrawer;
