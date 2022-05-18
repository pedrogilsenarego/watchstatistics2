import * as Styled from "./styles";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import SelectFormik from "src/components/Inputs/Select/SelectFormik";
import watchBrands from "src/assets/data/watchBrands2.json";

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
        <Styled.GridContainer container columnGap={1} >
          <Grid item xs={2}>
            <SelectFormik
              myLabel='Brand'
              size='small'
              name='productBrand'
              options={watchBrands}
            />
          </Grid>
        </Styled.GridContainer>
      ) : (
        <Styled.Typography variant='h6'>
          {productBrand} {productName} - {reference}
        </Styled.Typography>
      )
      }
    </>
  );
};

export default WatchName;
