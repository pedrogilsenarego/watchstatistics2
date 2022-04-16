import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import * as Styled from "./styles";
import ButtonFilters from "../../../../../components/Buttons/ButtonFilters";
import watchTypes from "src/assets/data/watchTypes.json";
import watchBrands from "src/assets/data/watchBrands.json";
import pricesBracket from "src/assets/data/pricesBracket.json";

interface Props {
  setFiltersVisible: (filtersVisible: boolean) => void;
  handleClearFilters: () => void;
  productCategory: string | null;
  setProductCategory: (productsCategory: string | null) => void;
  productBrands: string | null;
  setProductBrands: (productsBrands: string | null) => void;
  productPrices: string | null;
  setProductPrices: (productsPrices: string | null) => void;
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
          <RiCloseFill
            onClick={() => setFiltersVisible(false)}
            size="2.5em"
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
        <ButtonFilters
          value={productCategory}
          setValue={setProductCategory}
          list={watchTypes.options}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <Styled.TypographyClearFilters>Brands</Styled.TypographyClearFilters>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "2px" }}>
        <ButtonFilters
          value={productBrands}
          setValue={setProductBrands}
          list={watchBrands.options}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <Styled.TypographyClearFilters>Prices</Styled.TypographyClearFilters>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "2px" }}>
        <ButtonFilters
          value={productPrices}
          setValue={setProductPrices}
          list={pricesBracket.options}
        />
      </Grid>
    </Grid>
  );
};

export default FiltersMobile;
