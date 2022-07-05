import { ColumnType } from "src/components/TableList/types"

export const tableColumns = [
  {
    id: "preview",
    label: "Preview",
    type: ColumnType.Image,
    sortable: false,
   
  },
  {
    id: "name",
    label: "Watch Parts",
    type: ColumnType.Text,
    sortable: false,
   
  },
  {
    id: "priceBracket",
    label: "Price Bracket",
    type: ColumnType.Text,
    sortable: false,
  },
  {
    id: "sell",
    label: "Sell",
    type: ColumnType.ActionComponent,
    minWidth: 70,
    sortable: false,
  },
  
]