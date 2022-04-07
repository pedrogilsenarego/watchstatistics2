import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ProductVote from "../ProductVote";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import SignIn from "../../SignIn";
import { Radar } from "react-chartjs-2";
import Icons from "./Icons";

const initialTargetVoteState = {
  quality: "",
  price: "",
  brand: "",
  refinement: "",
  history: "",
  engineering: "",
  xFactor: "",
};

// eslint-disable-next-line
const ProductSidePanel = ({ isMatch }) => {
  const mapState = (state) => ({
    currentUser: state.user.currentUser,
    product: state.productsData.product,
  });

  const { product, currentUser } = useSelector(mapState);

  const [targetVoteCategories, setTargetVoteCategories] = useState({
    ...initialTargetVoteState,
  });
  const [targetVote, setTargetVote] = useState(false);
  const [update, setUpdate] = useState(true);
  const [easterEggMotion, setEasterEggMotion] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [anchorLogin, setAnchorLogin] = useState(null);
  const [coordinates, setCoordinates] = useState([1, 1]);

  const voteRef = useRef();
  const graphRef = useRef();
  const radarRef = useRef();

  const { productID } = useParams();

  const useStyles = makeStyles((theme) => ({
    menu: {
      transform: "translateX(-65%)",
      "& .MuiPaper-root": {
        backgroundColor: "#18161E",
        color: "#ffffff",
        disableScrollLock: true,

        maxWidth: "350px",
        boxShadow: "0 0 0.5rem hsl(0 0% 100%)",
      },
    },

    menu2: {
      marginTop: "70px",
      "& .MuiPaper-root": {
        backgroundColor: "#040406BF",
        color: "#ffffff",
        disableScrollLock: true,
        minWidth: "300px",

        [theme.breakpoints.up(750)]: {
          maxWidth: "350px",
        },
      },
    },

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

  const handleTargetVote = (value, name) => {
    setTargetVoteCategories({ ...targetVoteCategories, [name]: value });
  };

  const handleVisualTargetVote = (value) => {
    setTargetVote(value);
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleCloseLoginMenu = () => {
    setAnchorLogin(null);
  };
  const handleLoginOpen = (e) => {
    setAnchorLogin(e.currentTarget);
  };
  const configMenuLogin = {
    handleCloseLoginMenu,
  };

  const classes = useStyles();

  const {
    avgVotationsOwn,
    avgVotationsNotOwn,
    votationsOwn,
    votationsNonOwn,
    numberVotesOwn,
    numberVotesNotOwn,
    avgTotal,
  } = product;

  const targetVoteData = [
    targetVoteCategories.quality,
    targetVoteCategories.price,
    targetVoteCategories.brand,
    targetVoteCategories.refinement,
    targetVoteCategories.history,
    targetVoteCategories.engineering,
    targetVoteCategories.xFactor,
  ];

  const dataSetTargetVote = () => {
    if (targetVote)
      return {
        data: targetVoteData,
        label: "Target Vote",

        borderColor: "#F9350B",
        backgroundColor: "#F9350B66",
        fill: true,
      };
    return { label: "" };
  };

  const configRadarChart = {
    data: {
      //"Quality", "Price", "Brand", "Refinement", "History", "Engineering", "X-Factor"
      labels: ["S", "M", "L", "K", "R", "Q", "O"],
      datasets: [
        {
          data: votationsOwn,
          label: "Own/Experimented",

          borderColor: "#42e6f5",
          backgroundColor: "#42e6f566",
          fill: true,
        },

        {
          data: votationsNonOwn,
          label: "Only seen Digitaly",
          borderColor: "#E5F517",
          fill: true,
          backgroundColor: "#E5F51766",
        },
        dataSetTargetVote(),
      ],
    },

    options: {
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            title: function () {},
          },
        },
        legend: {
          position: "bottom",

          labels: {
            color: "#dcdae0",
            boxWidth: 20,
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
        datalabels: {
          labels: {
            title: {
              color: "pink",
            },
          },
        },
      },
      scales: {
        r: {
          grid: {
            color: "#dcdae066",
          },
          pointLabels: {
            color: "#dcdae0",
            font: {
              family: "MyFont",
              size: 20,
            },
          },
          angleLines: { color: "#dcdae066" },
          suggestedMin: 0,
          suggestedMax: 10,
          ticks: {
            stepSize: 2,
            color: "#ffffff",
            backdropColor: "#dcdae005",
          },
        },
      },
      layout: {
        padding: -8,
      },
      animations: {
        tension: {
          duration: 700,
          easing: "linear",
          from: 0.05,
          to: 0,
          loop: true,
        },
      },
    },
  };

  if (!targetVote) configRadarChart.data.datasets.pop();

  const returnLabel = (index) => {
    if (index === 0) return "Aesthetics from the Watch";
    if (index === 1) return "Price over Quality";
    if (index === 2) return "The strength from the brand";
    if (index === 3) return "Refinement from the watch";
    if (index === 4) return "History from the watch and brand";
    if (index === 5) return "What does the engineering from the watch presents";
    if (index === 6) return "History from the watch and brand";
    else return;
  };

  const getPositionFromIcons = () => {
    const scale = radarRef.current.scales.r;
    const pointLabelItems = scale._pointLabelItems;
    const newArray = [];
    pointLabelItems.forEach((pointLabelItem, index) => {
      const xpoint = pointLabelItem.left;
      const ypoint = pointLabelItem.top;
      const point = { x: xpoint - 5, y: ypoint - 5 };

      newArray.push(point);
    });
    setCoordinates(newArray);
  };

  window.onorientationchange = () => {
    getPositionFromIcons();
  };

  window.onresize = () => {
    getPositionFromIcons();
  };

  useEffect(() => {
    getPositionFromIcons();
  }, [isMatch]);

  const memoRadarChart = useMemo(
    () => <Radar ref={radarRef} {...configRadarChart} />,
    // eslint-disable-next-line
    [update]
  );

  const scrollToRef = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  const handleVote = () => {
    setShowVote(!showVote);
    if (!showVote) scrollToRef(voteRef);
  };

  const configTargetVote = {
    scrollToRef,
    graphRef,
    handleTargetVote,
    setTargetVote,
    handleVisualTargetVote,
    targetVote,

    handleUpdate,
    setShowVote,
  };

  return (
    <>
      <motion.div
        animate={{
          rotate: easterEggMotion ? 90 : 0,
        }}
      >
        <Card
          ref={graphRef}
          style={{
            backgroundColor: "#18161E",
            padding: "5px",
          }}
        >
          {coordinates.map((item, pos) => {
            const configIcons = {
              item,
              pos,
              returnLabel,
            };
            return <Icons key={pos} {...configIcons} />;
          })}

          <Grid container>
            <Grid item xs={12}>
              {memoRadarChart}
            </Grid>
            <Grid
              container
              item
              style={{
                marginTop: "10px",
                marginBottom: isMatch ? "10px" : "0px",
              }}
            >
              <Grid item xs={12} md={6}>
                <Box
                  style={{
                    textAlign: isMatch ? "center" : "left",
                    padding: "10px",
                  }}
                >
                  <Typography
                    fontWeight={600}
                    style={{ color: "#ffffff" }}
                    onClick={() => {
                      setEasterEggMotion(!easterEggMotion);
                    }}
                  >
                    Score: {avgTotal}
                  </Typography>

                  <Typography style={{ color: "#ffffffBF", fontSize: "13px" }}>
                    Own/Experimented: {avgVotationsOwn} Votes: {numberVotesOwn}
                  </Typography>
                  <Typography style={{ color: "#ffffffBF", fontSize: "13px" }}>
                    Only Seen Digital: {avgVotationsNotOwn} Votes:{" "}
                    {numberVotesNotOwn}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                alignItems="center"
                justifyContent="center"
                container
              >
                {currentUser && !currentUser.userVotes.includes(productID) && (
                  <Button
                    className={classes.textBtn}
                    style={{ width: "80%", borderColor: "orange" }}
                    aria-controls="vote"
                    onClick={(e) => {
                      handleVote();
                    }}
                    disableRipple
                  >
                    Vote
                  </Button>
                )}
                {currentUser && currentUser.userVotes.includes(productID) && (
                  <Button
                    className={classes.textBtn}
                    style={{ width: "80%" }}
                    disableRipple
                  >
                    Already Voted
                  </Button>
                )}
                {!currentUser && (
                  <Button
                    className={classes.textBtn}
                    style={{ width: "80%" }}
                    aria-controls="vote"
                    disableRipple
                    onClick={(e) => handleLoginOpen(e)}
                  >
                    Login to Vote
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
      <div ref={voteRef}>
        {showVote && <ProductVote {...configTargetVote} />}
      </div>
      <Menu
        disableScrollLock
        className={classes.menu2}
        id="login"
        onClose={handleCloseLoginMenu}
        anchorEl={anchorLogin}
        open={Boolean(anchorLogin)}
        anchorReference="none"
        PaperProps={{
          style: {
            left: "50%",
            transform: "translateX(-50%) translateY(15%)",
          },
        }}
      >
        <MenuItem disableRipple>
          <SignIn {...configMenuLogin} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProductSidePanel;
