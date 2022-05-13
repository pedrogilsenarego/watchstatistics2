import React, { useState } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { updateProductVoteStart } from "../../../redux/Products/products.actions";

import { Grid } from "@material-ui/core";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Button3 from "src/components/Buttons/Button3";
import { RiCloseFill } from "react-icons/ri";
import SliderComponent from "./SliderComponent";
import { Box } from "@mui/material";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  product: state.productsData.product,
});

const initialCategoriesState = {
  quality: "",
  price: "",
  brand: "",
  refinement: "",
  history: "",
  engineering: "",
  xFactor: "",
};

// eslint-disable-next-line
const ProductVote = ({
  handleTargetVote,
  setTargetVote,
  handleVisualTargetVote,
  setClearDrawerBackground,
  targetVote,
  handleUpdate,
  showVote,
  setShowVote,
  scrollToRef,
  graphRef,
}) => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const { product, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [minimalDrawer, setMinimalDrawer] = useState(false);
  const [ownership, setOwnership] = useState("");
  const [categories, setCategories] = useState({ ...initialCategoriesState });
  const [errors, setErrors] = useState(false);
  const { productID } = useParams();

  const { id, userVotes, numberVotes, experience, points } = currentUser;

  const {
    numberVotesOwn,
    numberVotesNotOwn,
    votationsOwn,
    votationsNonOwn,
    avgVotationsOwn,
    avgVotationsNotOwn,
  } = product;

  var i = 0;
  const newVotationsOwnArray = [];
  while (i < 7) {
    newVotationsOwnArray.push(
      (
        (categories[Object.keys(categories)[i]] +
          votationsOwn[i] * numberVotesOwn) /
        (numberVotesOwn + 1)
      ).toFixed(2)
    );
    i++;
  }
  var f = 0;
  const newVotationsNotOwnArray = [];
  while (f < 7) {
    newVotationsNotOwnArray.push(
      (
        (categories[Object.keys(categories)[f]] +
          votationsNonOwn[f] * numberVotesNotOwn) /
        (numberVotesNotOwn + 1)
      ).toFixed(2)
    );
    f++;
  }

  const newVoteArray = [...userVotes, productID];

  const handleApplyVote = (e) => {
    e.preventDefault();
    if (Object.values(categories).includes("") || ownership === "") {
      setErrors(true);
      return;
    }
    if (ownership === "Own") {
      const newAvgTotal =
        numberVotesNotOwn > 0
          ? (
              (+newAvgVotationsOwn * (numberVotesOwn + 1) +
                +avgVotationsNotOwn * numberVotesNotOwn) /
              (numberVotesNotOwn + numberVotesOwn + 1)
            ).toFixed(2)
          : (+newAvgVotationsOwn / 1).toFixed(2);

      const configVote = {
        numberVotesOwn: numberVotesOwn + 1,
        numberVotesNotOwn: numberVotesNotOwn,
        productID: productID,
        votationsNonOwn: votationsNonOwn,
        votationsOwn: newVotationsOwnArray,
        avgVotationsOwn: newAvgVotationsOwn,
        avgVotationsNotOwn: avgVotationsNotOwn,
        avgTotal: newAvgTotal,
        userID: id,
        numberVotes: numberVotes + 1,
        experience: experience + 1,
        points: points + 1,
        userVotes: newVoteArray,
      };
      dispatch(updateProductVoteStart(configVote));
    }
    if (ownership === "Not Own") {
      const newAvgTotal =
        numberVotesOwn > 0
          ? (
              (+newAvgVotationsNotOwn * (numberVotesNotOwn + 1) +
                +avgVotationsOwn * numberVotesOwn) /
              (numberVotesOwn + numberVotesNotOwn + 1)
            ).toFixed(2)
          : (+newAvgVotationsNotOwn / 1).toFixed(2);

      const configVote = {
        numberVotesOwn: numberVotesOwn,
        numberVotesNotOwn: numberVotesNotOwn + 1,
        productID: productID,
        votationsNonOwn: newVotationsNotOwnArray,
        votationsOwn: votationsOwn,
        avgVotationsOwn: avgVotationsOwn,
        avgVotationsNotOwn: newAvgVotationsNotOwn,
        avgTotal: newAvgTotal,
        userID: id,
        numberVotes: numberVotes + 1,
        experience: experience + 1,
        points: points + 1,
        userVotes: newVoteArray,
      };
      dispatch(updateProductVoteStart(configVote));
    }
    setErrors(false);
    setTargetVote(false);
    setShowVote(false);
    scrollToRef(graphRef);
  };

  const newAvgVotationsOwn = (
    newVotationsOwnArray.reduce(function (prev, curr) {
      return (Number(prev) || 0) + (Number(curr) || 0);
    }) / 7
  ).toFixed(2);

  const newAvgVotationsNotOwn = (
    newVotationsNotOwnArray.reduce(function (prev, curr) {
      return (Number(prev) || 0) + (Number(curr) || 0);
    }) / 7
  ).toFixed(2);

  const configSliderComponent = {
    setCategories,
    categories,
    handleTargetVote,
  };

  return (
    <Card
      style={{
        backgroundColor: "#18161E",
        marginTop: mobile ? "0px" : "8px",
        padding: mobile ? "0px" : "10px",
      }}
    >
      <CardContent style={{ padding: mobile ? "0px" : "20px" }}>
        <FormControl component='fieldset'>
          <Grid container xs={12}>
            {mobile && (
              <Grid container item xs={12} justifyContent='center'>
                <Grid item>
                  {!minimalDrawer ? (
                    <IoIosArrowDown
                      onClick={() => {
                        setMinimalDrawer(true);
                        setClearDrawerBackground(true);
                      }}
                      size='3em'
                      color='orange'
                    />
                  ) : (
                    <IoIosArrowUp
                      onClick={() => {
                        setMinimalDrawer(false);
                        setClearDrawerBackground(false);
                      }}
                      size='3em'
                      color='orange'
                    />
                  )}
                </Grid>
              </Grid>
            )}

            {mobile && !minimalDrawer && (
              <>
                <RadioGroup
                  aria-label='gender'
                  value={ownership}
                  onChange={(event) => {
                    setOwnership(event.target.value);
                  }}
                  style={{ color: "#ffffffBF" }}
                >
                  <FormControlLabel
                    value='Own'
                    control={
                      <Radio
                        checkedIcon={<RiCheckboxFill color='orange' />}
                        icon={<RiCheckboxBlankLine color='#ffffff66' />}
                      />
                    }
                    label='I own/experimented the watch'
                  />
                  <FormControlLabel
                    value='Not Own'
                    control={
                      <Radio
                        checkedIcon={<RiCheckboxFill color='orange' />}
                        icon={<RiCheckboxBlankLine color='#ffffff66' />}
                      />
                    }
                    label='I do not own/experimented the watch'
                  />
                </RadioGroup>
                {errors && ownership === "" && (
                  <Typography style={{ color: "red", fontSize: "15px" }}>
                    You must choose if you own or just seen the watch
                  </Typography>
                )}

                <Grid
                  item
                  container
                  justifyContent='center'
                  alignItems='center'
                  xs={12}
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    color: "#ffffffBF",
                  }}
                >
                  <SliderComponent
                    {...configSliderComponent}
                    icon='S'
                    name='quality'
                    message='Aesthetics from the Watch'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='M'
                    name='price'
                    message='Price over Quality'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='L'
                    name='brand'
                    message='The strength from the brand'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='K'
                    name='refinement'
                    message='Refinement from the watch'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='R'
                    name='history'
                    message='History from the watch and brand'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='Q'
                    name='engineering'
                    message='What does the engineering from the watch presents'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='O'
                    name='xFactor'
                    message='The overall special factor'
                  />

                  {errors && Object.values(categories).includes("") && (
                    <Typography style={{ color: "red", fontSize: "15px" }}>
                      You must choose all fields
                    </Typography>
                  )}
                </Grid>
              </>
            )}
            {!mobile && (
              <>
                <Grid item xs={12}>
                  <RadioGroup
                    aria-label='gender'
                    value={ownership}
                    onChange={(event) => {
                      setOwnership(event.target.value);
                    }}
                    style={{ color: "#ffffffBF" }}
                  >
                    <FormControlLabel
                      value='Own'
                      control={
                        <Radio
                          checkedIcon={<RiCheckboxFill color='orange' />}
                          icon={<RiCheckboxBlankLine color='#ffffff66' />}
                        />
                      }
                      label='I own/experimented the watch'
                    />
                    <FormControlLabel
                      value='Not Own'
                      control={
                        <Radio
                          checkedIcon={<RiCheckboxFill color='orange' />}
                          icon={<RiCheckboxBlankLine color='#ffffff66' />}
                        />
                      }
                      label='I do not own/experimented the watch'
                    />
                  </RadioGroup>
                  {errors && ownership === "" && (
                    <Typography style={{ color: "red", fontSize: "15px" }}>
                      You must choose if you own or just seen the watch
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  container
                  justifyContent='center'
                  alignItems='center'
                  xs={12}
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    color: "#ffffffBF",
                  }}
                >
                  <SliderComponent
                    {...configSliderComponent}
                    icon='S'
                    name='quality'
                    message='Aesthetics from the Watch'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='M'
                    name='price'
                    message='Price over Quality'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='L'
                    name='brand'
                    message='The strength from the brand'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='K'
                    name='refinement'
                    message='Refinement from the watch'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='R'
                    name='history'
                    message='History from the watch and brand'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='Q'
                    name='engineering'
                    message='What does the engineering from the watch presents'
                  />
                  <SliderComponent
                    {...configSliderComponent}
                    icon='O'
                    name='xFactor'
                    message='The overall special factor'
                  />

                  {errors && Object.values(categories).includes("") && (
                    <Typography style={{ color: "red", fontSize: "15px" }}>
                      You must choose all fields
                    </Typography>
                  )}
                </Grid>
              </>
            )}
            <Grid
              container
              item
              xs={12}
              alignItems='center'
              style={{ width: mobile ? "100vw" : "auto" }}
              justifyContent={mobile ? "center" : "flex-start"}
            >
              <Grid item>
                <Button3 title='Apply Vote' onClick={handleApplyVote} />
              </Grid>
              <Grid item>
                <Box
                  textAlign='center'
                  style={{
                    display: "flex",
                    alignItems: "center",

                    marginLeft: "10px",
                  }}
                >
                  <Typography
                    style={{
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "orange",
                    }}
                    onClick={() => {
                      handleVisualTargetVote(true);
                      handleUpdate();
                      if (mobile) {
                        setMinimalDrawer(!minimalDrawer);
                        setClearDrawerBackground(true);
                      }
                      scrollToRef(graphRef);
                    }}
                  >
                    Preview Vote
                  </Typography>
                </Box>
              </Grid>
              <RiCloseFill
                size='2.5em'
                color='orange'
                onClick={() => {
                  setShowVote(false);
                  scrollToRef(graphRef);
                }}
                style={{
                  position: "absolute",
                  right: mobile ? "20px" : 0,
                  bottom: mobile ? 0 : null,
                  cursor: "pointer",
                }}
              />
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
};
export default ProductVote;
