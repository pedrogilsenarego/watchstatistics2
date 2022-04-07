import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Display from "./Display";
import { useHistory } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@material-ui/core";

const Intro2 = () => {
  const history = useHistory();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth={"md"}>
      <Grid container spacing={isMatch ? 0 : 5}>
        {isMatch && (
          <Grid
            item
            xs={12}
            style={{ paddingTop: "8vh", marginBottom: "10px" }}
          >
            <Typography
              variant={"h5"}
              color={"hotPink"}
              style={{ fontWeight: "600" }}
            >
              The hottest watches
            </Typography>
            <Typography
              variant={"h3"}
              style={{ fontWeight: "600", marginTop: "4px" }}
            >
              Top most voted
            </Typography>
            <Typography variant={"h6"} style={{ marginTop: "8px" }}>
              What are the top watches for different categories, price brackets,
              brands and so much more
            </Typography>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={8}
          style={{ paddingTop: isMatch ? "2vh" : "20vh" }}
        >
          <Display />
        </Grid>
        {!isMatch && (
          <Grid item xs={12} md={4} style={{ paddingTop: "17vh" }}>
            <Typography
              variant={"h5"}
              color={"hotPink"}
              style={{ fontWeight: "600" }}
            >
              The hottest watches
            </Typography>
            <Typography variant={"h3"} style={{ fontWeight: "600" }}>
              Top most voted
            </Typography>
            <Typography variant={"subheader1"} style={{}}>
              What are the top watches for different categories, price brackets,
              brands and so much more
            </Typography>
            <Box
              style={{ display: "flex", marginTop: "20px", cursor: "pointer" }}
            >
              <Typography
                onClick={() => history.push(`/watchstatistics/stats`)}
                variant={"h6"}
                style={{}}
              >
                Check here{" "}
              </Typography>
              <AiOutlineDoubleRight
                color={"hotPink"}
                fontSize={"2em"}
                style={{ marginLeft: "10px" }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Intro2;
