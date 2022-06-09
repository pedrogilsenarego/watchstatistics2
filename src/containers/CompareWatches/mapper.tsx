import { ImCross } from "react-icons/im";

const deleteIcon = <ImCross fontSize='1em' color="#ffffffCE" style={{ cursor: "pointer" }} />

const mapCartItem = (cartItems: any, pos: number) => {
  return {
    id: pos,
    productID: cartItems.productID,
    productThumbnail: cartItems.productThumbnail[0],
    description:
      cartItems.productBrand +
      " " +
      cartItems.productName +
      " " +
      cartItems.reference,
    show: [
      {
        buttonType: "toggle",
        event: "show",
        label: "Show/Hide this watch",
        disabled: false,
      },
    ],
    delete: [
      {
        buttonType: "icon",
        event: "delete",
        icon: deleteIcon,
        label: "Remove this watch",
      },
    ],
  };
};

const mapCartItems = (cartItems: any) => {
  return { rows: cartItems.map((p: any, pos: number) => mapCartItem(p, pos)) };
};

export { mapCartItems };
