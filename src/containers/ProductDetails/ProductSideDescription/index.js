import { useState } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { Grid } from "@mui/material";
import AddDescription from "./AddDescription";
import { rewards } from "src/constants/gamification";

const useStyles = makeStyles((theme) => ({
  textBtn: {
    color: "#FFFFFF",
    fontSize: "13px",
    "&:hover": {
      color: "#FFA500",
    },
    "&:active": {
      color: "#FFFFFF",
    },
  },
}));

const mapState = (state) => ({
  product: state.productsData.product,
});

// eslint-disable-next-line
const ProductSideDescription = ({}) => {
  const { product } = useSelector(mapState);
  const [addDescription, setAddDescription] = useState(false);
  const { productDesc, additionalData } = product;
  const classes = useStyles();

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div>
      <Box style={{ marginTop: "10px" }} color={"text.secondary"}>
        <Typography
          variant={"h6"}
          style={{ paddingLeft: "10px", color: "#ffffff" }}
        >
          Description
        </Typography>
        <Box style={{ padding: "10px" }}>
          {productDesc !== "" ? (
            <Typography
              dangerouslySetInnerHTML={{ __html: productDesc }}
              align='justify'
              style={{
                marginTop: "5px",
                color: "#ffffffBF",
              }}
            />
          ) : !addDescription ? (
            <Typography
              style={{
                color: "#ffffffBF",
              }}
            >
              There is no description for this watch yet,{" "}
              <b
                onClick={() => {
                  setAddDescription(true);
                }}
                style={{ color: "orange", cursor: "pointer" }}
              >
                click here
              </b>{" "}
              to add a description and win{" "}
              <b style={{ color: "orange" }}>{rewards.PRODUCT_DESCRIPTION}</b>{" "}
              point.
            </Typography>
          ) : (
            <AddDescription setOpen={setAddDescription} />
          )}
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <Divider style={{ background: "white" }} />
      </Box>
      <Box
        color={"text.secondary"}
        borderRadius='10px'
        style={{ marginTop: "5px" }}
      >
        <Grid container>
          {additionalData &&
            additionalData.map((additionalData, pos) => {
              return (
                <Grid item xs={6} md={3} key={pos}>
                  <Button
                    className={classes.textBtn}
                    align='justify'
                    style={{ width: "100%", padding: "10px" }}
                    onClick={() => openInNewTab(`${additionalData.link}`)}
                  >
                    {additionalData.title}
                  </Button>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </div>
  );
};

export default ProductSideDescription;
