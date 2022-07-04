import { Avatar } from "@mui/material";
import useAvatarDashboard from "./useAvatarDashboard";
import * as Styled from "./styles";
import AddToBoost from "./AddToBoost";
import AddToCompare from "./AddToCompare";
import FacebookShare from "src/containers/forms/socialShare/Facebook";
import WhatsappShareButton from "src/containers/forms/socialShare/Whatsapp";
import { BiDotsHorizontalRounded } from "react-icons/bi";

interface Props {
  productID: string;
  product: any;
  avatarSize?: string;
}

const AvatarDashboard = ({ productID, product, avatarSize }: Props) => {
  const { mobile, configShareButtons, show, setShow } = useAvatarDashboard({
    product,
  });
  return (
    <>
      <Styled.Stack
        direction='row'
        spacing={1}
        mobile={mobile}
      >
        <Avatar
          sx={{
            bgcolor: "#ffffff1A",

            borderColor: "#ffffff66",
            width: avatarSize ?? "5vh",
            height: avatarSize ?? "5vh",
            cursor: "pointer",
          }}
        >
          <BiDotsHorizontalRounded
            onClick={() => setShow(!show)}
            size='2em'
            color='#ffffffCE'
          />
        </Avatar>
        {show && (
          <>
            <AddToBoost
              product={product}
              productID={productID}
              avatarSize={avatarSize}
            />
            <AddToCompare
              product={product}
              productID={productID}
              avatarSize={avatarSize}
            />
            <FacebookShare {...configShareButtons} avatarSize={avatarSize} />
            <WhatsappShareButton
              {...configShareButtons}
              avatarSize={avatarSize}
            />
          </>
        )}
      </Styled.Stack>
    </>
  );
};

export default AvatarDashboard;
