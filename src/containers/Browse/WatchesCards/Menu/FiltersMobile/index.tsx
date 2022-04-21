import { Grid } from "@mui/material";
import { RiCloseFill } from "react-icons/ri";
import * as Styled from "./styles";
import ButtonFilters from "../../../../../components/Buttons/ButtonFilters";
import watchTypes from "src/assets/data/watchTypes.json";
import watchBrands from "src/assets/data/watchBrands.json";
import pricesBracket from "src/assets/data/pricesBracket.json";
import { BsFileArrowUpFill, BsFileArrowDownFill } from "react-icons/bs";
import Button2 from "src/components/Buttons/Button2";

interface Props {
  setFiltersVisible: (filtersVisible: boolean) => void;
  handleClearFilters: () => void;
  productCategory: string | null;
  setProductCategory: (productsCategory: string | null) => void;
  dummyProductCategory: any;
  setDummyProductCategory: (dummyProductCategory: any) => void;
  dummyProductBrands: string | null;
  setDummyProductBrands: (productsBrands: string | null) => void;
  productBrands: string | null;
  setProductBrands: (productsBrands: string | null) => void;
  dummyProductPrices: string | null;
  setDummyProductPrices: (productsPrices: string | null) => void;
  productPrices: string | null;
  setProductPrices: (productsPrices: string | null) => void;
  dummyScore: "desc" | "asc";
  setDummyScore: (score: "desc" | "asc") => void;
  score: "desc" | "asc";
  setScore: (score: "desc" | "asc") => void;
  handleFetchProducts: () => void;
}

const FiltersMobile = ({
  setFiltersVisible,
  handleClearFilters,
  dummyProductCategory,
  setProductCategory,
  setDummyProductCategory,
  dummyProductBrands,
  setDummyProductBrands,
  setProductBrands,
  dummyProductPrices,
  setDummyProductPrices,
  setProductPrices,
  dummyScore,
  setDummyScore,
  score,
  setScore,
  handleFetchProducts,
}: Props) => {
  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        alignItems='center'
        justifyContent='space-between'
      >
        <Grid item>
          <RiCloseFill
            onClick={() => setFiltersVisible(false)}
            size='2.5em'
            color='lightGrey'
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
          value={dummyProductCategory}
          setValue={setDummyProductCategory}
          list={watchTypes.options}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <Styled.TypographyClearFilters>Brands</Styled.TypographyClearFilters>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "2px" }}>
        <ButtonFilters
          value={dummyProductBrands}
          setValue={setDummyProductBrands}
          list={watchBrands.options}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <Styled.TypographyClearFilters>Prices</Styled.TypographyClearFilters>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "2px" }}>
        <ButtonFilters
          value={dummyProductPrices}
          setValue={setDummyProductPrices}
          list={pricesBracket.options}
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <Styled.TypographyClearFilters>
          Sort Score
        </Styled.TypographyClearFilters>
      </Grid>
      <Grid item xs={12} style={{ marginLeft: "-6px" }}>
        <BsFileArrowDownFill
          onClick={() => setDummyScore("desc")}
          size='4em'
          color={dummyScore === "desc" ? "orange" : "#ffffff66"}
        />
        <BsFileArrowUpFill
          onClick={() => setDummyScore("asc")}
          size='4em'
          color={dummyScore === "asc" ? "orange" : "#ffffff66"}
        />
      </Grid>
      <Grid item xs={12} textAlign='center' style={{ marginTop: "40px" }}>
        <Button2
          title='Load Watches'
          onClick={() => {
            setProductCategory(dummyProductCategory);
            setProductPrices(dummyProductPrices);
            setProductBrands(dummyProductBrands);
            setScore(dummyScore);
            handleFetchProducts();
            setFiltersVisible(false);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FiltersMobile;
