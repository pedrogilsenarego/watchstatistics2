import { ColumnType, ClickType } from 'src/components/TableList/types'
// import { i18n } from 'src/translations/i18n'


export const tableColumns =

  [
    {
      id: "preview",
      label: "Preview",
      type: ColumnType.Image,
      sortable: false,
      onClick: ClickType.visitProduct
    },
    {
      id: "description",
      label: "Watch",
      type: ColumnType.Text,
      sortable: false,
      onClick: ClickType.visitProduct
    },
    {
      id: "generalState",
      label: "General",
      type: ColumnType.Text,
      sortable: false,

    },
    {
      id: "polishState",
      label: "Polish",
      type: ColumnType.Text,
      sortable: false,

    },
    {
      id: "movementState",
      label: "Movement",
      type: ColumnType.Text,
      sortable: false,

    },
    {
      id: "power",
      label: "Power",
      type: ColumnType.Text,
      sortable: false,

    },
    {
      id: "rating",
      label: "Rating",
      type: ColumnType.Rating,
      sortable: false,

    },
    {
      id: "price",
      label: "Price",
      type: ColumnType.Text,
      sortable: false,
    },
    {
      id: 'buy',
      label: 'Buy',
      type: ColumnType.ActionComponent,
      minWidth: 70,
      sortable: false,
    },


  ]