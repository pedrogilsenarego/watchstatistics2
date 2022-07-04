import { useTheme, useMediaQuery } from "@mui/material"

const useAvatarDashboard = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))

  return{mobile}
}

export default useAvatarDashboard