import * as Styled from "./styles";
import { useSelector } from "react-redux";

const mapState = (state: any) => ({
  product: state.productsData.product,
});

const WatchName = () => {
  const { product } = useSelector(mapState);
  const { productBrand, productName, reference } = product;

  return (
    <Styled.Typography variant='h6'>
      {productBrand} {productName} - {reference}
    </Styled.Typography>
  );
};

export default WatchName;
