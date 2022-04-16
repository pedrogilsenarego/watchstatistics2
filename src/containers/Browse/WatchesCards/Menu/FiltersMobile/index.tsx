import { Grid } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import * as Styled from "./styles";
import ButtonFilters from "../../../../../components/Buttons/ButtonFilters";

interface Props {
  setFiltersVisible: (filtersVisible: boolean) => void;
  handleClearFilters: () => void;
}

const FiltersMobile = ({ setFiltersVisible, handleClearFilters }: Props) => {
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
      <Grid item xs={12} style={{ marginTop: "5px" }}>
        <ButtonFilters />
      </Grid>
    </Grid>
  );
};

export default FiltersMobile;
