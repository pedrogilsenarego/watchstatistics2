


const mapCartItem = (cartItems: any) => {

  return {
    productThumbnail: cartItems.productThumbnail[0],
    description: cartItems.productBrand + " " + cartItems.productName + " " + cartItems.reference
  }
}

const mapCartItems = (cartItems: any) => {
  return { rows: cartItems.map((p: any) => mapCartItem(p)) }
}

export { mapCartItems }
