import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "src/redux/Cart/cart.actions";
import { clearCart } from "../../redux/Cart/cart.actions";
import { useHistory } from "react-router";
import { useMediaQuery, useTheme } from "@material-ui/core";

const mapState = (state: any) => ({
  cartItems: state.cartData.cartItems,
});

const useCompareWatches = () => {
  const dispatch = useDispatch();
  const [hide0, setHide0] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const { cartItems } = useSelector(mapState);
  const history = useHistory();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const [list, setList] = useState([]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveCartItem = (reference: string) => {
    dispatch(
      removeCartItem({
        reference,
      })
    );
  };

  const handleToggleView = (pos: number) => {
    if (pos === 0) setHide0(!hide0);
    if (pos === 1) setHide1(!hide1);
    if (pos === 2) setHide2(!hide2);
    if (pos === 3) setHide3(!hide3);
  };

  const handleAction = (type: string, id: number) => {
    switch (type) {
      case "delete": {
        handleRemoveCartItem(cartItems[id].reference);
        break;
      }
      case "show": {
        console.log(id);
        handleToggleView(id);
        break;
      }
      default:
        break;
    }
  };

  function mergeVotations(index: number) {
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

  const showClearWatches = () => {
    if (cartItems?.length > 0) return true;
  };

  const showSearchWatches = () => {
    if (cartItems?.length < 4) return true;
  };

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
            title: function (item: any, everything: any) {
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

  return {
    handleAction,
    handleClearCart,
    cartItems,
    history,
    mobile,
    configRadarChart,
    showClearWatches,
    showSearchWatches,
  };
};

export default useCompareWatches;
