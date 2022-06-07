import RadarChart from "../RadarChart";

import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapCartItems } from "./mapper";
import useCompareWatches from "./useCompareWatches";
import { Grid, Container, Paper, Button, Typography } from "@material-ui/core";

const CompareWatches = () => {
  const {
    handleAction,
    hide0,
    hide1,
    hide2,
    hide3,
    handleClearCart,
    cartItems,
    history,
    mobile,
  } = useCompareWatches();

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

  return (
    <Container
      disableGutters={mobile ? true : false}
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
              <TableList
                columns={tableColumns}
                rows={mapCartItems(cartItems).rows}
                onAction={handleAction}
              />
            )}

            <Grid container>
              <Grid item xs={6}>
                <Button
                  onClick={() => {
                    history.push("/browse");
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
