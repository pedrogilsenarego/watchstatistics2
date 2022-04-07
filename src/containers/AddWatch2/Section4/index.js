import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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

const Section4 = ({ isMatch }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [openDeleteWatchPopup, setOpenDeleteWatchPopup] = useState(false);
  const [openTextWatchPopup, setOpenTextWatchPopup] = useState(false);

  return (
    <Container maxWidth={"sm"}>
      <Grid container item spacing={1}>
        <Grid item xs={12} style={{ marginTop: "20vh", display: "flex" }}>
          <Typography>Additional Information</Typography>
          <Button disableRipple>
            <AiOutlineQuestionCircle
              fontSize="1.5em"
              onClick={() => setOpenTextWatchPopup(!openTextWatchPopup)}
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

        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <Container
            style={{
              backgroundColor: "white",
              height: "170px",
              padding: "0px",

              borderRadius: "4px",
            }}
          >
            <TextField
              name="productDesc"
              className={classes.textField}
              multiline
              InputLabelProps={{ shrink: false }}
              rows={6}
              placeholder="Description from Watch*"
            ></TextField>
          </Container>
        </Grid>

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
              name="additionalDataTitle"
              placeholder="Title*  ex:Hodinkee"
            ></TextField>
          </Container>
        </Grid>
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
              name="additionalDataLink"
              placeholder="Link*  ex:https://www.hodinkee.com/articles/..."
            ></TextField>
          </Container>
        </Grid>

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

      <Popup
        title={"How to add text"}
        openPopup={openTextWatchPopup}
        setOpenPopup={setOpenTextWatchPopup}
      >
        <Grid item xs={12}>
          <Typography style={{ color: "black", fontSize: "12px" }}>
            To set up the description text use the following procedure: <br />
            1. When using the text from a source put the text between "" and the
            name of the Source after
            <br />
            2. To make any part of text bold wrap in the tag
            &lt;b&gt;&lt;/b&gt;, to use a line break use the tag &lt;br&gt;
            <br />
            <br />
            Ex: "In attempting something of a predictive AMA, here is a
            synthesis of the many curious DMs, emails, and voicemail questions
            I’ve received over the past year. But, as I’m sure to miss a query
            or two, please check out my original A Week On The Wrist with the
            SPB143, and drop any remaining questions into the comments. I will
            endeavor to fill in as many blanks as possible …" Hodinkee
          </Typography>
        </Grid>
      </Popup>
    </Container>
  );
};

export default Section4;
