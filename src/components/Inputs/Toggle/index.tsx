import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material'
import * as Styled from './styles'

export type ToggleProps = {
  isActive: boolean,
  onClick?: () => void,
  label?: string,
  confirmationRequired?: boolean,
  confirmationButtonLabel?: string,
  declineButtonLabel?: string,
  confirmationTitle?: string,
  confirmationDescription?: string,
}

const Toggle = ({
  label,
  isActive,
  onClick,
  confirmationRequired = false,
  confirmationButtonLabel = 'Accept',
  declineButtonLabel = 'Decline',
  confirmationTitle,
  confirmationDescription,
}: ToggleProps) => {
  const [openConfirmation, setOpenConfirmation] = useState(false)

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false)
  }

  const handleClick = () => {
    if (confirmationRequired) {
      if (openConfirmation) {
        handleCloseConfirmation()
        if (onClick) onClick()
      } else {
        setOpenConfirmation(true)
      }
      return
    }
    if (onClick) onClick()
  }

  return (
    <>
      <Box component="div" display="flex" alignItems="center">
        {label && <Typography>{label}</Typography>}
        <Box component="div" display="flex" ml={2}>
          <Styled.ToggleInput
            id="switch"
            type="checkbox"
            name="switch"
            style={{ margin: 0 }}
          />
          <Styled.ToggleLabel
            isActive={isActive}
            style={{ margin: 0 }}
            htmlFor="switch"
            onClick={handleClick}
          />
        </Box>
      </Box>
      {confirmationRequired && (
        <Dialog
          data-testid="dialog"
          open={openConfirmation}
          onClose={handleCloseConfirmation}
          PaperProps={{ sx: { bgcolor: 'white' } }}
        >
          <DialogTitle>{confirmationTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{confirmationDescription}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation}>
              {declineButtonLabel}
            </Button>
            <Button onClick={handleClick}>{confirmationButtonLabel}</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default Toggle
