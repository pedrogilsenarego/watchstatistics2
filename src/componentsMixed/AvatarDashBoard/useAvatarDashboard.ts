import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material"

interface Props {
  product:any;
}

const useAvatarDashboard = ({product}:Props) => {
  const [show, setShow] = useState(false)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))

  const configShareButtons = {
    quote:
      "Vote here on your personal opinion for the " +
      product?.productBrand +
      " " +
      product?.productName +
      " " +
      product?.reference +
      " with a score of " +
      product?.avgTotal,
    url: "https://fir-auth0-9b4cb.web.app/product/" + product?.documentID,
  };

  return{mobile, configShareButtons, show, setShow}
}

export default useAvatarDashboard