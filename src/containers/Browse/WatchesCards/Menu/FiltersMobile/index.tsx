import { Grid } from "@mui/material";
import { AiFillCloseSquare } from "react-icons/ai";

interface Props {
  filtersVisible: boolean;
  setFiltersVisible: (filtersVisible: boolean) => void;
}

const FiltersMobile = ({ setFiltersVisible, filtersVisible }: Props) => {
  return (
    <Grid container>
      <Grid item>
        <AiFillCloseSquare
          onClick={() => setFiltersVisible(false)}
          size="2em"
          color="lightGrey"
        />
      </Grid>
    </Grid>
  );
};

export default FiltersMobile;
