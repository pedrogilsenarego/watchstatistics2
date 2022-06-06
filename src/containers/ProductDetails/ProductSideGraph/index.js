import React, { useState, useMemo, useRef, useEffect } from "react";
import { Grid, Box, Typography, Card } from "@material-ui/core";
import { useSelector } from "react-redux";
import ProductVote from "../ProductVote";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { Radar } from "react-chartjs-2";
import Icons from "./Icons";
import { useFormikContext } from "formik";
import { useTheme, useMediaQuery } from "@mui/material";
import Drawer from "src/components/Drawer";
import Button3 from "src/components/Buttons/Button3";
import Button3Formik from "src/components/Buttons/Button3Formik";
import Alert from "src/components/Alert";
import { i18n } from "src/translations/i18n";
import VotesBox from "./VotesBox";
import RewardsBanner from "./RewardsBanner";
import DrawerMine from "src/components/Drawer";
import MobileSecondaryDrawer from "src/containers/Header/MobileSecondaryDrawer";

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
const ProductSidePanel = ({
  isMatch,
  showVote,
  setShowVote,
  voteRef,
  newWatch,
}) => {
  const mapState = (state) => ({
    currentUser: state.user.currentUser,
    product: state.productsData.product,
  });

  const { product, currentUser } = useSelector(mapState);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const [targetVoteCategories, setTargetVoteCategories] = useState({
    ...initialTargetVoteState,
  });
  const [targetVote, setTargetVote] = useState(false);
  const [update, setUpdate] = useState(true);
  const [easterEggMotion, setEasterEggMotion] = useState(false);
  const [clearDrawerBackground, setClearDrawerBackground] = useState(false);
  const [coordinates, setCoordinates] = useState([1, 1]);
  const [triggerAlert, setTriggerAlert] = useState(false);
  const [minimalDrawer, setMinimalDrawer] = useState(false);
  const { isValid } = useFormikContext();
  const [mobileDrawerSecondary, setMobileDrawerSecondary] = useState(false);

  const graphRef = useRef();
  const radarRef = useRef();

  const { productID } = useParams();

  const handleTargetVote = (value, name) => {
    setTargetVoteCategories({ ...targetVoteCategories, [name]: value });
  };

  const handleVisualTargetVote = (value) => {
    setTargetVote(value);
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleLoginOpen = (e) => {
    setMobileDrawerSecondary(true);
  };

  const { votationsOwn, votationsNonOwn } = product;

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
    if (index === 6) return "The overall special factor";
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
    [product, update]
  );

  const scrollToRef = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  const handleVote = () => {
    setShowVote(true);
    scrollToRef(voteRef);
  };

  const configTargetVote = {
    setClearDrawerBackground,
    scrollToRef,
    graphRef,
    handleTargetVote,
    setTargetVote,
    handleVisualTargetVote,
    targetVote,
    showVote,
    handleUpdate,
    setShowVote,
    minimalDrawer,
    setMinimalDrawer,
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
              {!newWatch && (
                <Grid item xs={12} style={{ padding: "10px" }}>
                  <VotesBox
                    easterEggMotion={easterEggMotion}
                    setEasterEggMotion={setEasterEggMotion}
                  />
                </Grid>
              )}
              {newWatch && !mobile && (
                <Grid item xs={12} style={{ padding: "10px" }}>
                  <RewardsBanner />
                </Grid>
              )}

              {!mobile && (
                <>
                  <Grid
                    item
                    xs={12}
                    alignItems='center'
                    justifyContent='center'
                    container
                    style={{ marginTop: newWatch ? "15px" : "0px" }}
                  >
                    {newWatch ? (
                      <Button3Formik
                        title='Submit'
                        customOnClick={() => {
                          if (!isValid) {
                            setTriggerAlert(true);
                          }
                        }}
                      />
                    ) : (
                      <>
                        {currentUser &&
                          !showVote &&
                          !currentUser.userVotes.includes(productID) && (
                            <Button3
                              title='Vote'
                              aria-controls='vote'
                              onClick={(e) => {
                                handleVote();
                              }}
                            />
                          )}
                        {currentUser &&
                          currentUser.userVotes.includes(productID) && (
                            <Box>
                              <Typography
                                style={{
                                  color: "orange",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                }}
                              >
                                Already Voted
                              </Typography>
                            </Box>
                          )}
                        {!currentUser && (
                          <Button3
                            title='Login to Vote'
                            onClick={(e) => handleLoginOpen(e)}
                          />
                        )}
                      </>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <Alert
                      severity='error'
                      message={i18n.t("forms.notifications.error")}
                      trigger={triggerAlert}
                      setTrigger={setTriggerAlert}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Card>
      </motion.div>
      <div ref={voteRef}>
        {showVote && !mobile && <ProductVote {...configTargetVote} />}
      </div>
      <DrawerMine
        id={0}
        fullHeight
        fullWidth
        position='right'
        openDrawer={mobileDrawerSecondary}
        setOpenDrawer={setMobileDrawerSecondary}
      >
        <MobileSecondaryDrawer setMobileDrawer={setMobileDrawerSecondary} />
      </DrawerMine>
      {mobile && (
        <Drawer
          clearBackground={clearDrawerBackground}
          position='bottom'
          topRadius
          id={0}
          fullWidth
          openDrawer={showVote}
          setOpenDrawer={setShowVote}
        >
          <ProductVote {...configTargetVote} />
        </Drawer>
      )}
    </>
  );
};

export default ProductSidePanel;
