import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapParts } from "./constants/mapper";
import useGoodiesList from "./useGoodiesList";
import { Grid } from "@mui/material";
import * as GeneralStyled from "src/styles/styles";
import BoxesPopup from "src/componentsMixed/BoxesPopup";

const GoodiesList = () => {
  const { handleAction, currentUser, helperPopup, setHelperPopup, title, typeOfBox, handleBoxPopup } = useGoodiesList();

  return (
    <>
      <BoxesPopup openPopup={helperPopup} setOpenPopup={setHelperPopup} title={title} typeOfBox={typeOfBox} />
      <Grid container columnSpacing={2} rowGap={2} mt='20px'>
        <Grid item xs={12} sm={6} textAlign="end">
          <GeneralStyled.Card specialBorder style={{ textAlign: "center" }}>
            <GeneralStyled.BasicTypography>
              Boosters: {currentUser?.boosters || 0}
            </GeneralStyled.BasicTypography>
            <GeneralStyled.BasicTypography onClick={() => handleBoxPopup("whiteBox")}>
              White Box: {currentUser?.whiteBox || 0}
            </GeneralStyled.BasicTypography>
            <GeneralStyled.BasicTypography onClick={() => handleBoxPopup("blueBox")}>
              Blue Box: {currentUser?.blueBox || 0}
            </GeneralStyled.BasicTypography>
            <GeneralStyled.BasicTypography onClick={() => handleBoxPopup("purpleBox")}>
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
    </>
  );
};

export default GoodiesList;
