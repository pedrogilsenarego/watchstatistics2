import { Tooltip, Avatar } from "@mui/material"
import { AiFillFire } from "react-icons/ai";
import useAddToBoost from "./useAddToBoost";

interface Props {
  productID: string;
  product: any;
  avatarSize?: string;
}



const AddToBoost = ({ productID, product, avatarSize }: Props) => {
  const { handleAddToBoost } = useAddToBoost({ productID, product })
  const label = "Select this watch for boosting";

  return (
    <>
      <Tooltip arrow placement='top' title={label}>
        <Avatar
          sx={{
            bgcolor: "#00000000",
            border: "solid 3px",
            borderColor: "#ffffff66",
            width: avatarSize ?? "5vh",
            height: avatarSize ?? "5vh",
            cursor: "pointer",
          }}
          onClick={() => {
            handleAddToBoost();
          }}
        >
          <AiFillFire size='3.5vh' color='#ffffff66' />
        </Avatar>
      </Tooltip>
    </>
  )
}

export default AddToBoost