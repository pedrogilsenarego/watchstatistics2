import { useState } from "react"
import * as Styled from "./styles";
import { useSelector } from "react-redux";
import { i18n } from "src/translations/i18n"
import { MdAddCircle } from "react-icons/md";
import { Grid } from "@mui/material"

interface Props {
  newWatch: boolean;
}

const mapState = (state: any) => ({
  product: state.productsData.product,
});

const WatchName = ({ newWatch }: Props) => {
  const { product } = useSelector(mapState);
  const { productBrand, productName, reference } = product;
  const [openNewWatchName, setOpenNewWatchName] = useState<boolean>(false)


  return (
    <>
      {newWatch ? (
        <Grid container columnGap={1}>
          <Styled.Typography variant='h6'>
            {i18n.t('forms.newWatch.watchName.title')}
          </Styled.Typography>
          <MdAddCircle
            color='orange'
            onClick={() => {
              setOpenNewWatchName(true);
            }}
            style={{ cursor: "pointer" }}
            size='2em'
          /></Grid>
      ) : (
        <Styled.Typography variant='h6'>
          {productBrand} {productName} - {reference}
        </Styled.Typography>
      )}
    </>
  );
};

export default WatchName;
