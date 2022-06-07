import { styled, Box } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.primary.main,
  borderRadius: '4px',
  overflow: 'clip',
}))
