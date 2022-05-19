import * as Styled from "./styles";
import { useSelector } from "react-redux";
import WatchNameNewWatch from "./WatchNameNewWatch"

interface Props {
  newWatch: boolean;
}

const mapState = (state: any) => ({
  product: state.productsData.product,
});

const WatchName = ({ newWatch }: Props) => {
  const { product } = useSelector(mapState);
  const { productBrand, productName, reference } = product;

  return (
    <>
      {newWatch ? (
        <WatchNameNewWatch />
      ) : (
        <Styled.Typography variant='h6'>
          {productBrand} {productName} - {reference}
        </Styled.Typography>
      )}
    </>
  );
};

export default WatchName;
