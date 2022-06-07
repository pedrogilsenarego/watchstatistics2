import { styled, Checkbox, TableRow as MuiTableRow, BoxProps, TableCell as MuiTableCell, TableContainer as MuiTableContainer, TableCellProps as MuiTableCellProps, Box } from "@mui/material"

export const CheckboxContainer = styled(Checkbox)({
  height: '24px',
})

export const TableContainer = styled(MuiTableContainer)(() => ({
  position: 'relative',
  maxHeight: '65vh',
  borderRadius: '5px',
}))

interface TableRowProps {
  isChecked?: boolean
}

export const TableRow = styled(MuiTableRow)<TableRowProps>(({ isChecked }) => ({
  background: isChecked ? '#FFF7DF' : 'transparent',
  color: '#333333',
}))

interface TableCellProps extends MuiTableCellProps {
  isFirstRow?: boolean;
}

export const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'isFirstRow',
})<TableCellProps>(({ isFirstRow }) => ({
  borderBottom: isFirstRow ? 'none' : '2px solid #E6E6E9',
  fontSize: isFirstRow ? '12px' : '14px',
  paddingInline: '27px',
  paddingTop: isFirstRow ? '16px' : '8px',
  paddingBottom: isFirstRow ? '16px' : '8px',
  color: "#ffffffCE !important"
}))

export const ActionContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
})

interface TableChipProps extends BoxProps {
  bgColor?: string;
}

export const TableChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFirstRow',
})<TableChipProps>(({ bgColor }) => ({
  fontSize: '14px',
  borderRadius: '12px',
  padding: '5px 10px',
  display: 'initial',
  textAlign: 'center',
  backgroundColor: bgColor,
  color: 'white',
}))