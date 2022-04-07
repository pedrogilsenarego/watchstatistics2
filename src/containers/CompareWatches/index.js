import React, { useState } from "react";
import RadarChart from "../RadarChart";
import { useHistory } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  useMediaQuery,
  Container,
  useTheme,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";

import { clearCart } from "../../redux/Cart/cart.actions";
import Item from "./Item";

const mapState = (state) => ({
  cartItems: state.cartData.cartItems,
});

const CompareWatches = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(mapState);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [hide0, setHide0] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  function mergeVotations(index) {
    var i = 0;
    const newArray = [];
    const { votationsOwn, numberVotesOwn, votationsNonOwn, numberVotesNotOwn } =
      cartItems[index];
    while (i < 7) {
      newArray.push(
        (
          (Number(votationsNonOwn[i]) * numberVotesNotOwn +
            Number(votationsOwn[i]) * numberVotesOwn) /
          (numberVotesNotOwn + numberVotesOwn)
        ).toFixed(2)
      );
      i++;
    }
    return newArray;
  }

  const configRadarChart = {
    data: {
      //"Quality", "Price", "Brand", "Refinement", "History", "Engineering", "X-Factor"
      labels: ["S", "M", "L", "K", "R", "Q", "O"],
      datasets: [
        {
          data: cartItems[0] && mergeVotations(0),
          label: cartItems[0] && cartItems[0].productName,

          borderColor: hide0 ? "#42e6f51A" : "#42e6f5",
          backgroundColor: hide0 ? "#42e6f51A" : "#42e6f566",
          fill: true,
        },
        {
          data: cartItems[1] && mergeVotations(1),
          label: cartItems[1] && cartItems[1].productName,
          borderColor: hide1 ? "#E5F5171A" : "#E5F517",
          fill: true,
          backgroundColor: hide1 ? "#E5F5171A" : "#E5F51766",
        },
        {
          data: cartItems[2] && mergeVotations(2),
          label: cartItems[2] && cartItems[2].productName,
          borderColor: hide2 ? "#ffffff1A" : "#ffffff",
          fill: true,
          backgroundColor: hide2 ? "#ffffff1A" : "#ffffff66",
        },
        {
          data: cartItems[3] && mergeVotations(3),
          label: cartItems[3] && cartItems[3].productName,
          borderColor: hide3 ? "#DC0D0D1A" : "#DC0D0D",
          fill: true,
          backgroundColor: hide3 ? "#DC0D0D1A" : "#DC0D0D66",
        },
      ],
    },

    options: {
      plugins: {
        tooltip: {
          displayColors: false,
          titleAlign: "center",
          bodyAlign: "center",
          titleColor: "#ffffff",
          bodyColor: "#ffffffDB",
          callbacks: {
            title: function (item, everything) {
              if (item[0].label === "Q") {
                return "Engineering";
              }
              if (item[0].label === "S") {
                return "Aesthetics";
              }
              if (item[0].label === "M") {
                return "Price over Quality";
              }
              if (item[0].label === "L") {
                return "Brand";
              }
              if (item[0].label === "K") {
                return "Refinement";
              }
              if (item[0].label === "R") {
                return "History";
              }
              if (item[0].label === "O") {
                return "X-Factor";
              }
              return;
            },
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
              size: 15,
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

  let n = 3;
  while (n > 0) {
    if (!cartItems[n]) configRadarChart.data.datasets.pop();
    n--;
  }

  const handleToggleView = (pos) => {
    if (pos === 0) setHide0(!hide0);
    if (pos === 1) setHide1(!hide1);
    if (pos === 2) setHide2(!hide2);
    if (pos === 3) setHide3(!hide3);
  };

  return (
    <Container
      disableGutters={isMatch ? true : false}
      style={{ marginTop: "100px" }}
    >
      <Grid
        container
        spacing={2}
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
      >
        <Grid item xs={12} md={7}>
          <Paper style={{ background: "#18161E" }}>
            {cartItems && cartItems.length > 0 && (
              <TableContainer>
                <Table size="small" border="0" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ fontSize: "15px" }}>
                        Image
                      </TableCell>
                      <TableCell align="left" style={{ fontSize: "15px" }}>
                        Description
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: "15px" }}>
                        Label
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: "15px" }}>
                        Hide
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: "15px" }}>
                        Remove
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item, pos) => {
                      const color =
                        item === cartItems[0]
                          ? "#42e6f5"
                          : item === cartItems[1]
                          ? "#E5F517"
                          : item === cartItems[2]
                          ? "#ffffff"
                          : "#DC0D0D";
                      const configItem = {
                        ...item,
                        color: color,
                        handleToggleView,
                        pos: pos,
                      };
                      return <Item {...configItem} />;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Grid container>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    history.push("/search");
                  }}
                >
                  Search for Watches
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    handleClearCart();
                  }}
                >
                  Clear Watches
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper style={{ background: "#18161E" }}>
            <RadarChart {...configRadarChart} />
            <Typography>
              Weighted average from the votes of owners VS non-owners
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompareWatches;
