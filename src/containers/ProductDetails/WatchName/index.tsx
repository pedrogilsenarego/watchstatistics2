import * as Styled from "./styles";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import SelectFormik from "src/components/Inputs/Select/SelectFormik";
import TextfieldFormik from "src/components/Inputs/Textfield/Textfield2Formik";
import watchBrands from "src/assets/data/watchBrands2.json";
import { useField } from "formik";

interface Props {
  newWatch: boolean;
}

const mapState = (state: any) => ({
  product: state.productsData.product,
});

const WatchName = ({ newWatch }: Props) => {
  const { product } = useSelector(mapState);
  const { productBrand, productName, reference } = product;
  const [, metaProductBrand, helpersProductBrand] = useField("productBrand");
  const [, metaProductName, helpersProductName] = useField("productName");
  const [, metaReference, helpersReference] = useField("reference");

  return (
    <>
      {newWatch ? (
        <Styled.GridContainer container columnGap={1}>
          <Grid item xs={2}>
            {metaProductBrand.touched ? (
              <Styled.TypographyNewWatch
                variant='h6'
                onClick={() => helpersProductBrand.setTouched(false)}
              >
                {metaProductBrand.value}
              </Styled.TypographyNewWatch>
            ) : (
              <SelectFormik
                myLabel='Brand'
                size='small'
                name='productBrand'
                options={watchBrands}
              />)}
          </Grid>
          <Grid item xs={2}>
            {metaProductName.touched ? (
              <Styled.TypographyNewWatch
                variant='h6'
                onClick={() => helpersProductName.setTouched(false)}
              >
                {metaProductName.value}
              </Styled.TypographyNewWatch>
            ) : (
              <TextfieldFormik
                placeholder='Model'
                size='small'
                name='productName'
              />
            )}</Grid>

          <Grid item xs={2}>
            {metaReference.touched ? (
              <Styled.TypographyNewWatch
                variant='h6'
                onClick={() => helpersReference.setTouched(false)}
              >
                {metaReference.value}
              </Styled.TypographyNewWatch>
            ) : (
              <TextfieldFormik
                placeholder='Reference'
                size='small'
                name='reference'
              />)}
          </Grid>
        </Styled.GridContainer>
      ) : (
        <Styled.Typography variant='h6'>
          {productBrand} {productName} - {reference}
        </Styled.Typography>
      )}
    </>
  );
};

export default WatchName;
