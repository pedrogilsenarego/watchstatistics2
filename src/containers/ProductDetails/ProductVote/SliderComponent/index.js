import React, { useState } from "react";
import { Slider, Typography, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";

import Popover from "../../../../components/Popover";

const muiTheme = createTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "orange",
      },
      track: {
        color: "white",
      },
      rail: {
        color: "white",
      },
    },
  },
});

const SliderComponent = ({
  setCategories,
  categories,
  handleTargetVote,
  icon,
  name,
  message,
}) => {
  const [anchor, setAnchor] = useState(null);

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <Grid item xs={2}>
          <Typography
            onClick={(e) => {
              setAnchor(e.currentTarget);
            }}
            onMouseOver={(e) => {
              setAnchor(e.currentTarget);
            }}
            onMouseOut={() => {
              setAnchor(null);
            }}
            style={{
              fontSize: "20px",
              fontFamily: "MyFont",
              cursor: "pointer",
            }}
            id="discrete-slider"
            gutterBottom
          >
            {icon}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
            name="quality"
            onChange={(event, newValue) => {
              setCategories({ ...categories, [name]: newValue });
              handleTargetVote(newValue, name);
            }}
          />
        </Grid>
      </ThemeProvider>
      <Popover anchor={anchor} setAnchor={setAnchor} message={message} />
    </>
  );
};

export default SliderComponent;
