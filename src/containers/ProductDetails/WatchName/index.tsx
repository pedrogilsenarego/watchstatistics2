import * as Styled from "./styles";
import { useSelector } from "react-redux";
import { i18n } from "src/translations/i18n"

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
        <Styled.Typography variant='h6'>
          {i18n.t('forms.newWatch.watchName.title')}
        </Styled.Typography>
      ) : (
        <Styled.Typography variant='h6'>
          {productBrand} {productName} - {reference}
        </Styled.Typography>
      )}
    </>
  );
};

export default WatchName;
