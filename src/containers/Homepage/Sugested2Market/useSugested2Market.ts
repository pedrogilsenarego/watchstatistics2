import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";

const TILES_SHOW = 4;

const mapState = (state: Redux) => ({
  marketData: state.marketData.marketProducts,
});

const useSugested2Market = () => {
  const { marketData } = useSelector(mapState);


  function createGroups(arr:any[], numGroups:number, perGroup:number) {
    return new Array(numGroups)
      .fill('')
      .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
  }

  const mapItem = (p:any, pos:number) => {
    return {
      id: pos,
      image: p.image,
      main: p.productBrand + " " + p.productName + " " + p.reference,
      second: "Price: "+ p.price + " points"
    }
  }

  const data2 = marketData.map((p,pos)=>mapItem(p,pos))

  const data = createGroups(data2,Math.ceil(marketData.length/TILES_SHOW),TILES_SHOW)

  console.log(data)


  return { data };
};

export default useSugested2Market;
