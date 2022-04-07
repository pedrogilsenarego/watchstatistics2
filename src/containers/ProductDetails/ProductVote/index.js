import React, { useState } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { updateProductVoteStart } from "../../../redux/Products/products.actions";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

import SliderComponent from "./SliderComponent";

const useStyles = makeStyles((theme) => ({
  textBtn: {
    color: "#FFFFFF",
    border: "solid 2px",
    borderColor: "#ffffff66",
    fontSize: "13px",
    borderRadius: "20px",
    "&:hover": {
      color: "#FFA500",
    },
    "&:active": {
      color: "#FFFFFF",
    },
  },
}));

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
  targetVote,
  handleUpdate,
  setShowVote,
  scrollToRef,
  graphRef,
}) => {
  const classes = useStyles();

  const { product, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
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
    if (Object.values(categories).includes("")) {
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
        marginTop: "8px",
        padding: "10px",
      }}
    >
      <CardContent style={{ padding: "20px" }}>
        <FormControl component="fieldset">
          <Grid container>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="gender"
                value={ownership}
                onChange={(event) => {
                  setOwnership(event.target.value);
                }}
                style={{ color: "#ffffffBF" }}
              >
                <FormControlLabel
                  value="Own"
                  control={
                    <Radio
                      checkedIcon={<RiCheckboxFill color="orange" />}
                      icon={<RiCheckboxBlankLine color="#ffffff66" />}
                    />
                  }
                  label="I own/experimented the watch"
                />
                <FormControlLabel
                  value="Not Own"
                  control={
                    <Radio
                      checkedIcon={<RiCheckboxFill color="orange" />}
                      icon={<RiCheckboxBlankLine color="#ffffff66" />}
                    />
                  }
                  label="I do not own/experimented the watch"
                />
              </RadioGroup>
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={12}
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                color: "#ffffffBF",
              }}
            >
              <SliderComponent
                {...configSliderComponent}
                icon="S"
                name="quality"
                message="Aesthetics from the Watch"
              />
              <SliderComponent
                {...configSliderComponent}
                icon="M"
                name="price"
                message="Price over Quality"
              />
              <SliderComponent
                {...configSliderComponent}
                icon="L"
                name="brand"
                message="The strength from the brand"
              />
              <SliderComponent
                {...configSliderComponent}
                icon="K"
                name="refinement"
                message="Refinement from the watch"
              />
              <SliderComponent
                {...configSliderComponent}
                icon="R"
                name="history"
                message="History from the watch and brand"
              />
              <SliderComponent
                {...configSliderComponent}
                icon="Q"
                name="engineering"
                message="What does the engineering from the watch presents"
              />
              <SliderComponent
                {...configSliderComponent}
                icon="O"
                name="xFactor"
                message="Something hard to explain but special about it"
              />

              {errors && Object.values(categories).includes("") && (
                <Typography style={{ color: "red", fontSize: "15px" }}>
                  You must choose all fields
                </Typography>
              )}
            </Grid>

            <Button
              className={classes.textBtn}
              style={{ borderColor: "orange" }}
              onClick={handleApplyVote}
            >
              Apply Vote
            </Button>
            <Button
              className={classes.textBtn}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                handleVisualTargetVote(true);
                handleUpdate();
                scrollToRef(graphRef);
              }}
            >
              Preview Vote
            </Button>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
};
export default ProductVote;
