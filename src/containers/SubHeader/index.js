import { Box, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { generalEndpoints } from "src/constants/endpoints";
import useSubHeader from "./useSubHeader";
import * as Styled from "./styles";
import * as GeneralStyled from "src/styles/styles";

// eslint-disable-next-line
const WatchstatisticsSubHeader = () => {
  const {
    history,
    mobile,
    currentUser,
    theme,
    progress,
    avatarLetter,
    getRank,
  } = useSubHeader();

  const { userVotes, displayName, watchesSubmited } = currentUser;
  const numberVotes = userVotes ? userVotes.length - 1 : 0;

  return (
    <Styled.Container>
      <Grid container textAlign='center' justifyContent='center'>
        <Grid item container xs={12} sm={6} alignItems='center'>
          <Grid
            item
            container
            xs={12}
            md={4}
            justifyContent={mobile ? "center" : "flex-end"}
          >
            <Styled.Avatar
              onClick={() => {
                history.push(generalEndpoints.DASHBOARD);
              }}
              sx={{
                bgcolor: "#A91D07",
              }}
            >
              <Styled.AvatarTypography>
                {avatarLetter()}
              </Styled.AvatarTypography>
            </Styled.Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            style={{ marginTop: mobile ? "10px" : "0px" }}
          >
            <Typography
              variant='h4'
              style={{
                fontFamily: "Open Sans Condensed,sans-serif",
              }}
            >
              Welcome, {displayName}
            </Typography>
            <Typography
              variant='h6'
              style={{
                color: "#ffffffB3",
                fontFamily: "Open Sans Condensed,sans-serif",
              }}
            >
              have you voted today?
            </Typography>
          </Grid>
        </Grid>
        {mobile && (
          <Divider
            style={{
              width: "100%",
              background: theme.palette.text.faded3,
              marginTop: "10px",
            }}
          />
        )}

        <Grid
          item
          container
          xs={12}
          sm={6}
          alignItems='center'
          style={{
            marginTop: mobile ? "10px" : "0px",
          }}
        >
          <Grid
            item
            container
            xs={12}
            md={6}
            justifyContent='center'
            alignItems='center'
          >
            <Styled.PointsBox
              display='flex'
              alignItems='center'
              justifyContent='center'
              columnGap={1}
              onClick={() => {
                history.push(generalEndpoints.WATCH_LABORATORY);
              }}
            >
              <GeneralStyled.BasicTypography
                fontSize='40px'
                fontWeight={800}
                fontFamily='Open Sans Condensed,sans-serif'
              >
                {currentUser.points}
              </GeneralStyled.BasicTypography>
              <GeneralStyled.BasicTypography
                fontSize='14px'
                fontWeight={500}
                fontFamily='Open Sans Condensed,sans-serif'
              >
                Points
              </GeneralStyled.BasicTypography>
            </Styled.PointsBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <Styled.InfoBox alignItems='center' justifyContent='center'>
              <GeneralStyled.BasicTypography
                fontFamily='Open Sans Condensed,sans-serif'
                fontSize='12px'
                color='#ffffffB3'
              >
                <b style={{ fontSize: "20px" }}>{numberVotes}</b> Watches Voted
              </GeneralStyled.BasicTypography>
              <GeneralStyled.BasicTypography
                fontFamily='Open Sans Condensed,sans-serif'
                fontSize='12px'
                color='#ffffffB3'
              >
                <b style={{ fontSize: "20px" }}>{watchesSubmited}</b> Watches
                Submited
              </GeneralStyled.BasicTypography>
              <GeneralStyled.BasicTypography
                fontFamily='Open Sans Condensed,sans-serif'
                fontSize='12px'
                color='#ffffffB3'
              >
                <b style={{ fontSize: "20px" }}>{getRank?.rank}</b> Rank
              </GeneralStyled.BasicTypography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Styled.BorderLinearProgress
                  getRank={getRank}
                  style={{ width: "50%" }}
                  variant='determinate'
                  value={progress}
                />
              </Box>
            </Styled.InfoBox>
          </Grid>
        </Grid>
      </Grid>
    </Styled.Container>
  );
};

export default WatchstatisticsSubHeader;
