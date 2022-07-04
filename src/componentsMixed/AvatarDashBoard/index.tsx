import { } from "@mui/material"
import useAvatarDashboard from "./useAvatarDashboard"
import * as Styled from "./styles"
import AddToBoost from "./AddToBoost"

interface Props {
  productID: string;
  product: any;
  avatarSize?: string
}

const AvatarDashboard = ({ productID, product, avatarSize }: Props) => {
  const { mobile } = useAvatarDashboard()
  return (
    <><Styled.Stack
      direction='row'
      spacing={1}
      mobile={mobile}
    ><AddToBoost product={product} productID={productID} avatarSize={avatarSize} /></Styled.Stack></>
  )
}

export default AvatarDashboard