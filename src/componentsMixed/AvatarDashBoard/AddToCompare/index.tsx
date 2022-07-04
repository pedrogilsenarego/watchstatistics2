import { Tooltip, Avatar, Typography } from "@mui/material"
import useAddToCompare from "./useAddToCompare"
import { BsFillGrid1X2Fill } from "react-icons/bs"

interface Props {
  avatarSize?: string;
  productID: string;
  product: any;
}

const AddToCompare = ({ avatarSize, productID, product }: Props) => {
  const { compareWatches, handleAddToCart } = useAddToCompare({ productID, product })
  const label = compareWatches
    ? [" This watch is already selected, for comparison"]
    : ["Select this watch to compare with other watches"];

  return (
    <>
      <Tooltip arrow placement='top' title={label}>
        <Avatar
          sx={{
            bgcolor: "#00000000",
            border: "solid 2px",
            borderColor: "#ffffff66",
            width: avatarSize ?? "5vh",
            height: avatarSize ?? "5vh",
            cursor: "pointer",
          }}
          onClick={() => {
            handleAddToCart();
          }}

        >
          {compareWatches && (
            <Typography
              style={{
                color: "#ffffff66",
                fontWeight: "800",
                textAlign: "center"
              }}
            >
              X
            </Typography>
          )}
          {!compareWatches && (
            <BsFillGrid1X2Fill size='2vh' color='#ffffff66' />
          )}
        </Avatar>
      </Tooltip>
    </>
  )
}

export default AddToCompare