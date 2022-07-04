import TableList from "src/components/TableList";
import { tableColumns } from "./constants";
import { mapParts } from "./constants/mapper";
import useGoodiesList from "./useGoodiesList"

interface Props {
  parts: string[];
}

const GoodiesList = ({ parts }: Props) => {
  const { handleAction } = useGoodiesList()

  return (
    <>
      <TableList
        onAction={handleAction}
        columns={tableColumns}
        rows={mapParts(parts).rows}
      />
    </>
  );
};

export default GoodiesList;
