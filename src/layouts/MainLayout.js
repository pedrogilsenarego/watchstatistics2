import React from "react";
import Header from "../containers/Header";
import Footer from "../components/Footer";
import { Grid } from "@mui/material";

const HomepageLayout = (props) => {
  return (
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
      <Grid item textAlign='start'>
        <Footer {...props} />
      </Grid>
    </Grid>
  );
};

export default HomepageLayout;
