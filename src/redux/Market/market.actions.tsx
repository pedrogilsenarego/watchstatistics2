import marketTypes from "./market.types";

export const setToAuction = (order: Object) => ({
  type: marketTypes.ADD_TO_AUCTION,
  payload: order
});

export const fetchMarketProductsStart = (filters = {}) => ({
  type: marketTypes.FETCH_MARKET_PRODUCTS_START,
  payload: filters
});

export const setMarketProducts = (products: Object) => ({
  type: marketTypes.SET_MARKET_PRODUCTS,
  payload: products
});

export const buyMarketProduct = (payload: { documentID: string }) => ({
  type: marketTypes.BUY_MARKET_PRODUCT_START,
  payload: payload
});

export const removeMarketItem = (productID: string) => ({
  type: marketTypes.REMOVE_MARKET_ITEM,
  payload: productID
});
