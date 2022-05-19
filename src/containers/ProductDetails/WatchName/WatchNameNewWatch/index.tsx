import * as Styled from "./styles";
import { Grid } from "@mui/material";
import SelectFormik from "src/components/Inputs/Select/SelectFormik";
import TextfieldFormik from "src/components/Inputs/Textfield/Textfield2Formik";
import watchBrands from "src/assets/data/watchBrands2.json";
import { useField } from "formik";

const WatchNameNewWatch = () => {
  const [, metaProductBrand, helpersProductBrand] = useField("productBrand");
  const [, metaProductName, helpersProductName] = useField("productName");
  const [, metaReference, helpersReference] = useField("reference");

  return (
    <Styled.GridContainer container columnGap={1}>

      {(metaProductBrand.touched && metaProductBrand.value !== "") ? (
        <Styled.TypographyNewWatch
          variant='h6'
          onClick={() => helpersProductBrand.setTouched(false)}
        >
          {metaProductBrand.value}
        </Styled.TypographyNewWatch>
      ) : (
        <Grid item xs={2}>
          <SelectFormik
            myLabel={metaProductBrand.value ? "" : 'Brand'}
            size='small'
            name='productBrand'
            options={watchBrands}
          /></Grid>)}
      {(metaProductName.touched && metaProductName.value !== "") ? (
        <Styled.TypographyNewWatch
          variant='h6'
          onClick={() => helpersProductName.setTouched(false)}
        >
          {metaProductName.value} -
        </Styled.TypographyNewWatch>
      ) : (<Grid item xs={2}>
        <TextfieldFormik
          onClick={() => helpersProductName.setTouched(false)}
          placeholder='Model'
          size='small'
          name='productName'
        /></Grid>
      )}
      {(metaReference.touched && metaReference.value !== "") ? (
        <Styled.TypographyNewWatch
          variant='h6'
          onClick={() => helpersReference.setTouched(false)}
        >
          {metaReference.value}
        </Styled.TypographyNewWatch>
      ) : (<Grid item xs={2}>
        <TextfieldFormik
          onClick={() => helpersReference.setTouched(false)}
          placeholder='Reference'
          size='small'
          name='reference'
        /> </Grid>)}

    </Styled.GridContainer>
  )
}

export default WatchNameNewWatch