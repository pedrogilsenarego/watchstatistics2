import { Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import Divider from "@mui/material/Divider";
import { generalEndpoints } from "src/constants/endpoints";
import useSubHeader from "./useSubHeader";
import * as Styled from "./styles";

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
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              columnGap={1}
              onClick={() => {
                history.push(generalEndpoints.WATCH_LABORATORY);
              }}
              style={{
                backgroundColor: "#2874A6",
                height: "100px",
                width: "150px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              <Typography
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  fontFamily: "Open Sans Condensed,sans-serif",
                }}
              >
                {currentUser.points}
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Open Sans Condensed,sans-serif",
                }}
              >
                Points
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant='h6'
              style={{
                color: "#ffffffB3",
                fontFamily: "Open Sans Condensed,sans-serif",
              }}
            >
              Watches Voted: {numberVotes}
            </Typography>
            <Typography
              variant='h6'
              style={{
                color: "#ffffffB3",
                fontFamily: "Open Sans Condensed,sans-serif",
              }}
            >
              Watches Submited: {watchesSubmited}
            </Typography>
            <Typography
              variant='h6'
              style={{
                color: getRank?.color,
                fontFamily: "Open Sans Condensed,sans-serif",
              }}
            >
              Rank: {getRank?.color}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "5px",
              }}
            >
              <Styled.BorderLinearProgress
                getRank={getRank}
                style={{ width: "50%" }}
                variant='determinate'
                value={progress}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Styled.Container>
  );
};

export default WatchstatisticsSubHeader;
