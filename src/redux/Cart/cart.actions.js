import cartTypes from "./cart.types";

export const addProduct = (cartItem) => ({
	type: cartTypes.ADD_TO_CART,
	payload: cartItem
});

export const removeCartItem = (cartItem) => ({
	type: cartTypes.REMOVE_CART_ITEM,
	payload: cartItem
});

export const reduceCartItem = (cartItem) => ({
	type: cartTypes.REDUCE_CART_ITEM,
	payload: cartItem
});

export const clearCart = () => ({
	type: cartTypes.CLEAR_CART
});

//new implementations
export const addBooster = (product) => ({
	type: cartTypes.ADD_BOOSTER_TO_CART,
	payload: product
});
