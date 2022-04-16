import * as Styled from "./styles";
import { MdArrowForwardIos } from "react-icons/md";
import { Grid } from "@mui/material";

const ButtonFilters = () => {
  return (
    <Styled.Box component="div">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Styled.Typography>Choose</Styled.Typography>
        </Grid>
        <Grid>
          <MdArrowForwardIos size="2em" />
        </Grid>
      </Grid>
    </Styled.Box>
  );
};

export default ButtonFilters;
