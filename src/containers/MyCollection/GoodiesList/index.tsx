import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapParts } from "./constants/mapper";
import useGoodiesList from "./useGoodiesList"
import { Grid } from "@mui/material"

interface Props {
  parts: string[];
}

const GoodiesList = ({ parts }: Props) => {
  const { handleAction } = useGoodiesList()

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <TableList
          onAction={handleAction}
          columns={tableColumns}
          rows={mapParts(parts).rows}
        />
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </Grid>
  );
};

export default GoodiesList;
