import { Redux } from "src/redux/types";
import { useSelector } from "react-redux";

const mapState = (state: Redux) => ({
  marketData: state.marketData.marketProducts,
  
});

const useSugested2Market = () => {
  const { marketData } = useSelector(mapState);
  const data = [[{ image: marketData[0].image, main: "teste" }, 1], [1, 2], [1, 3]]
  return {data}
}

export default useSugested2Market