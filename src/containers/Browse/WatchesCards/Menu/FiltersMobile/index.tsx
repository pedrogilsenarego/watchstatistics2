import { Grid } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import * as Styled from "./styles";
import ButtonFilters from "../../../../../components/Buttons/ButtonFilters";
import watchTypes from "src/assets/data/watchTypes.json";
import watchBrands from "src/assets/data/watchBrands.json";
import pricesBracket from "src/assets/data/pricesBracket.json";

interface Props {
  setFiltersVisible: (filtersVisible: boolean) => void;
  handleClearFilters: () => void;
  productCategory: string;
  setProductCategory: (productsCategory: string) => void;
  productBrands: string;
  setProductBrands: (productsBrands: string) => void;
  productPrices: string;
  setProductPrices: (productsPrices: string) => void;
}

const FiltersMobile = ({
  setFiltersVisible,
  handleClearFilters,
  productCategory,
  setProductCategory,
  productBrands,
  setProductBrands,
  productPrices,
  setProductPrices,
}: Props) => {
  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <AiFillCloseSquare
            onClick={() => setFiltersVisible(false)}
            size="2em"
            color="lightGrey"
          />
        </Grid>
        <Grid item>
          <Styled.TypographyClearFilters onClick={handleClearFilters}>
            Clear Filters
          </Styled.TypographyClearFilters>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Styled.TypographyTitle>Filters</Styled.TypographyTitle>
      </Grid>
      <Styled.CategoriesGrid item xs={12}>
        <Styled.TypographyClearFilters>
          Categories
        </Styled.TypographyClearFilters>
      </Styled.CategoriesGrid>
      <Grid item xs={12} style={{ marginTop: "2px" }}>
        <ButtonFilters value={productCategory} list={watchTypes.options} />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <Styled.TypographyClearFilters>Brands</Styled.TypographyClearFilters>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "2px" }}>
        <ButtonFilters value={productBrands} list={watchBrands.options} />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <Styled.TypographyClearFilters>Prices</Styled.TypographyClearFilters>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "2px" }}>
        <ButtonFilters value={productPrices} list={pricesBracket.options} />
      </Grid>
    </Grid>
  );
};

export default FiltersMobile;
