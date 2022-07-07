import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapParts } from "./constants/mapper";
import useGoodiesList from "./useGoodiesList";
import { Grid } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";

const GoodiesList = () => {
  const { handleAction, currentUser } = useGoodiesList();

  return (
    <Grid container columnSpacing={2} rowGap={2} mt='20px'>
      <Grid item xs={12} sm={6} textAlign="end">
        <GeneralStyled.Card specialBorder style={{ textAlign: "center" }}>
          <GeneralStyled.BasicTypography>
            Boosters: {currentUser?.boosters || 0}
          </GeneralStyled.BasicTypography>
          <GeneralStyled.BasicTypography>
            White Box: {currentUser?.whiteBox || 0}
          </GeneralStyled.BasicTypography>
          <GeneralStyled.BasicTypography>
            Blue Box: {currentUser?.blueBox || 0}
          </GeneralStyled.BasicTypography>
          <GeneralStyled.BasicTypography>
            Purple Box: {currentUser?.purpleBox || 0}
          </GeneralStyled.BasicTypography>
        </GeneralStyled.Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TableList
          onAction={handleAction}
          columns={tableColumns}
          rows={mapParts(currentUser?.watchParts ?? []).rows}
        />
      </Grid>

    </Grid>
  );
};

export default GoodiesList;
