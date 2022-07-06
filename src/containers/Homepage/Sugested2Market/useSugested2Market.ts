import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMarketProductsStart } from "src/redux/Market/market.actions";
import { individualRating } from "src/Utils/gamyfication";
import { createGroups } from "src/Utils/math";

const TILES_SHOW = 4;

const mapState = (state: Redux) => ({
  marketData: state.marketData.marketProducts,
});

const useSugested2Market = () => {
  const { marketData } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMarketProductsStart({}));
    // eslint-disable-next-line
  }, []);



  const mapItem = (p: any, pos: number) => {
    return {
      id: pos,
      image: p.image,
      main: p.productBrand + " " + p.productName + " " + p.reference,
      second:
        "Price: " +
        p.price +
        " points . Rating: " +
        individualRating(p.generalState, p.polishState, p.movementState),
    };
  };

  const data2 = marketData.map((p, pos) => mapItem(p, pos));

  const data = createGroups(
    data2,
    Math.ceil(marketData.length / TILES_SHOW),
    TILES_SHOW
  );

  return { data };
};

export default useSugested2Market;
