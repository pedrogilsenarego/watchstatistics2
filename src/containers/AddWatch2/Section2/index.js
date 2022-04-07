import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";

import TextField from "../../forms/InputMUI";
import Popup from "../../controls/Popup";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Divider from "@mui/material/Divider";
import { useTheme } from "@material-ui/core";

const IMAGE_ADRESS =
  "https://www.lifewire.com/thmb/O35ttQdgXOmbxzFuiPHwgR0xYg8=/1373x972/filters:no_upscale():max_bytes(150000):strip_icc()/ScreenShot2020-04-20at10.06.28AM-69855f4797cb4be4bbed72f51dff1ab5.jpg";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-input": { color: "white" },
    "& . MuiInputLabel-root": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root": { color: "grey" },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderWidth: "2px",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "black",
    },
    "&:hover .MuiInputLabel-root": { color: "grey" },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
    "&  .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      color: "#ffffffB3",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ffffffB3" },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffffB3",
    },
  },

  textBtn: {
    color: "#FFFFFF",
    fontSize: "13px",
    backgroundColor: "#00000066",
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

const Section2 = ({
  isMatch,
  additionalProductThumbnail2,
  setAdditionalProductThumbnail2,
  additionalProductThumbnail3,
  setAdditionalProductThumbnail3,
  additionalProductThumbnail4,
  setAdditionalProductThumbnail4,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [openDeleteWatchPopup, setOpenDeleteWatchPopup] = useState(false);

  return (
    <Container maxWidth={"sm"}>
      <Grid container item spacing={1}>
        <Grid item xs={12} style={{ marginTop: "20vh", display: "flex" }}>
          <Typography>Choose the Images</Typography>
          <Button disableRipple>
            <AiOutlineQuestionCircle
              onClick={() => setOpenDeleteWatchPopup(!openDeleteWatchPopup)}
              fontSize="1.5em"
              color="white"
              style={{ marginTop: "-3px" }}
            />
          </Button>
        </Grid>
        <Divider
          style={{
            width: "100%",
            background: theme.palette.text.faded3,
            marginTop: "5px",
          }}
        />
        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Container
            style={{
              backgroundColor: "white",
              height: "40px",
              padding: "0px",

              borderRadius: "4px",
            }}
          >
            <TextField
              size="small"
              className={classes.textField}
              name="productThumbnail"
              placeholder="Main Image*"
            ></TextField>
          </Container>
        </Grid>

        {additionalProductThumbnail2 && (
          <Grid item xs={6} style={{ marginTop: "10px" }}>
            <Container
              style={{
                backgroundColor: "white",
                height: "40px",
                padding: "0px",

                borderRadius: "4px",
              }}
            >
              <TextField
                size="small"
                className={classes.textField}
                name="productThumbnail2"
                placeholder="Image2"
              ></TextField>
            </Container>
          </Grid>
        )}
        {additionalProductThumbnail3 && (
          <Grid item xs={6} style={{ marginTop: "10px" }}>
            <Container
              style={{
                backgroundColor: "white",
                height: "40px",
                padding: "0px",

                borderRadius: "4px",
              }}
            >
              <TextField
                size="small"
                className={classes.textField}
                name="productThumbnail3"
                label="Image 3"
              ></TextField>
            </Container>
          </Grid>
        )}
        {additionalProductThumbnail4 && (
          <Grid item xs={6} style={{ marginTop: "10px" }}>
            <Container
              style={{
                backgroundColor: "white",
                height: "40px",
                padding: "0px",

                borderRadius: "4px",
              }}
            >
              <TextField
                size="small"
                className={classes.textField}
                name="productThumbnail4"
                label="Image 4"
              ></TextField>
            </Container>
          </Grid>
        )}

        <Grid item xs={6} style={{ marginTop: "10px" }}>
          <Container
            style={{
              backgroundColor: "white",
              height: "40px",
              padding: "0px",

              borderRadius: "4px",
            }}
          >
            <TextField
              size="small"
              className={classes.textField}
              name="productBackground"
              placeholder="Background Image*"
            ></TextField>
          </Container>
        </Grid>
        {!additionalProductThumbnail4 && (
          <Grid item xs={6}>
            <Button
              className={classes.textBtn}
              style={{ marginTop: "10px" }}
              onClick={() => {
                if (!additionalProductThumbnail2)
                  setAdditionalProductThumbnail2(true);
                if (additionalProductThumbnail2)
                  setAdditionalProductThumbnail3(true);
                if (additionalProductThumbnail3)
                  setAdditionalProductThumbnail4(true);
              }}
            >
              Additional Image
            </Button>
          </Grid>
        )}
        <Divider
          style={{
            width: "100%",
            background: theme.palette.text.faded3,
            marginTop: "30px",
          }}
        />
        <Typography
          variant="subheader1"
          style={{ paddingLeft: "8px", marginTop: "10px" }}
        >
          * fields have to be filled
        </Typography>
      </Grid>
      <Popup
        title={"How to add images"}
        openPopup={openDeleteWatchPopup}
        setOpenPopup={setOpenDeleteWatchPopup}
      >
        <Grid item xs={12}>
          <img style={{ width: "40vw" }} src={IMAGE_ADRESS} alt="" />
          <Typography
            style={{ color: "black", fontSize: "12px", marginTop: "5px" }}
          >
            1. Select the images you want to insert from the Web and right click
            on it. <br /> 2. Copy the image adress(Image) <br />
            3. paste the path of the desired image to the insert field. <br />
            Dont forget to choose a good quality image, you can preview the
            final outcome to confirm.
          </Typography>
        </Grid>
      </Popup>
    </Container>
  );
};

export default Section2;
