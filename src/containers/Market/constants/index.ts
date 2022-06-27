import { ColumnType, ClickType } from 'src/components/TableList/types'
// import { i18n } from 'src/translations/i18n'


export const tableColumns =

  [
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


  ]