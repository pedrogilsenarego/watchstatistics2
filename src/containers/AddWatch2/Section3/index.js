import React from "react";
import Grid from "@mui/material/Grid";
import ButtonMUI from "../../forms/ButtonMUI";
import { Button } from "@material-ui/core";
import ProductDetailsPreview from "../../../pages/ProductDetailsPreview";
import Popup from "../../controls/Popup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textBtn: {
    color: "#FFFFFF",
    fontSize: "13px",
    backgroundColor: "#00000000",
    border: "solid 2px",
    borderColor: "orange",
    borderRadius: "14px",
    "&:hover": {
      color: "#FFA500",
      backgroundColor: "#ffffff00",
    },
    "&:active": {
      color: "#FFFFFF",
    },
  },
}));

const Section3 = ({
  preview,
  setPreview,
  productThumbnail,
  productBackground,
  productDesc,
  additionalData,
  openBoxPopUp,
  setOpenBoxPopUp,
  isMatch,
}) => {
  const classes = useStyles();
  const configPreview = {
    productThumbnail,
    productBackground,
    productDesc,
    additionalData,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        item
        spacing={1}
        direction="column"
        alignItems={isMatch ? "center" : "flex-end"}
        justifyContent="center"
        style={{
          position: "absolute",
          marginTop: "70vh",
          maxWidth: "35vw",
          padding: "10px",
        }}
      >
        <Grid item xs={12}>
          {preview && (
            <ButtonMUI
              style={{ borderColor: "#00000000", backgroundColor: "#00000000" }}
              className={classes.textBtn}
            >
              Preview
            </ButtonMUI>
          )}
          {!preview && (
            <Button
              style={{ borderColor: "#00000000", backgroundColor: "#00000000" }}
              className={classes.textBtn}
              onClick={() => setPreview(!preview)}
            >
              Back
            </Button>
          )}
          {!preview && (
            <ButtonMUI className={classes.textBtn}>Submit</ButtonMUI>
          )}

          {preview && (
            <Button
              className={classes.textBtn}
              onClick={() => setPreview(!preview)}
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>

      <Popup
        title="Preview your watch"
        openPopup={openBoxPopUp}
        setOpenPopup={setOpenBoxPopUp}
      >
        <ProductDetailsPreview {...configPreview} />
      </Popup>
    </div>
  );
};

export default Section3;
