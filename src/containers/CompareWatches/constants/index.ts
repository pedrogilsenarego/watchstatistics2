import { ColumnType } from 'src/components/TableList/types'
// import { i18n } from 'src/translations/i18n'

export const tableColumns = [
  {
    id: "productThumbnail",
    label: "Preview",
    type: ColumnType.Image,
    sortable: false,
  },
  {
    id: "description",
    label: "Description",
    type: ColumnType.Text,
    sortable: false,
  },
  {
    id: "show",
    label: "Show",
    type: ColumnType.ActionComponent,
    sortable: false,
  },
  {
    id: 'delete',
    label: 'Remove',
    type: ColumnType.ActionComponent,
    minWidth: 70,
    sortable: false,
  },

]