import { ImCross } from "react-icons/im";

const deleteIcon = <ImCross fontSize='1em' color="#ffffffCE" style={{ cursor: "pointer" }} />

const mapCartItem = (cartItems: any) => {
  return {
    productThumbnail: cartItems.productThumbnail[0],
    description:
      cartItems.productBrand +
      " " +
      cartItems.productName +
      " " +
      cartItems.reference,
    delete: [
      {
        buttonType: "icon",
        event: "delete",
        icon: deleteIcon,
        label: "Remove",
      },
    ],
  };
};

const mapCartItems = (cartItems: any) => {
  return { rows: cartItems.map((p: any) => mapCartItem(p)) };
};

export { mapCartItems };
