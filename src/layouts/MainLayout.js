import React from "react";
import Header from "../containers/Header";
import Footer from "../components/Footer";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

const HomepageLayout = (props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {!mobile ? (
        <Grid
          container
          direction='column'
          justifyContent='space-between'
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Header {...props} />
            {props.children}
          </Grid>
          <Grid item xs={12}>
            <Footer {...props} />
          </Grid>
        </Grid>
      ) : (
        <>
          <Header {...props} />
          {props.children}
          <Footer {...props} />
        </>
      )}
    </>
  );
};

export default HomepageLayout;
