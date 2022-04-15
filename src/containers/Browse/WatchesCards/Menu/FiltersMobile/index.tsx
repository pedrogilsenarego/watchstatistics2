import { Grid } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";
import * as Styled from "./styles";

interface Props {
  setFiltersVisible: (filtersVisible: boolean) => void;
}

const FiltersMobile = ({ setFiltersVisible }: Props) => {
  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid item>
          <AiFillCloseSquare
            onClick={() => setFiltersVisible(false)}
            size="2em"
            color="lightGrey"
          />
        </Grid>
        <Grid item>
          <Styled.TypographyClearFilters>
            Clear Filters
          </Styled.TypographyClearFilters>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Styled.TypographyTitle>Filters</Styled.TypographyTitle>
      </Grid>
    </Grid>
  );
};

export default FiltersMobile;
