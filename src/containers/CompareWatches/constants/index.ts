import { ColumnType } from 'src/components/TableList/types'
// import { i18n } from 'src/translations/i18n'

export const tableColumns = [
  {
    id: "productThumbnail",
    label: "image",
    type: ColumnType.Image,
    sortable: false,
  },
  {
    id: "description",
    label: "productBrand",
    type: ColumnType.Text,
    sortable: false,
  },

]