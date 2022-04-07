import productsTypes from "./products.types";

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductStart = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID,
});

export const fetchProductStart = (productID) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: productID,
});

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
});

export const updateProductVoteStart = (productData) => ({
  type: productsTypes.UPDATE_PRODUCT_VOTE_START,
  payload: productData,
});

export const fetchLatestProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_LATEST_PRODUCTS_START,
  payload: filters,
});

export const setLatestProducts = (latestProducts) => ({
  type: productsTypes.SET_LATEST_PRODUCTS,
  payload: latestProducts,
});

export const fetchValidationProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_VALIDATION_PRODUCTS_START,
  payload: filters,
});

export const setValidationProducts = (validationProducts) => ({
  type: productsTypes.SET_VALIDATION_PRODUCTS,
  payload: validationProducts,
});
export const updateProductDetailsStart = (productDetails) => ({
  type: productsTypes.UPDATE_PRODUCT_DETAILS_START,
  payload: productDetails,
});

export const fetchRandomProduct = (randomDetails) => ({
  type: productsTypes.FETCH_RANDOM_PRODUCT,
  payload: randomDetails,
});

export const setRandomProduct = (product) => ({
  type: productsTypes.SET_RANDOM_PRODUCT,
  payload: product,
});

//
export const fetchMyCollectionStart = (myCollection) => ({
  type: productsTypes.FETCH_MY_COLLECTION_START,
  payload: myCollection,
});

export const setMyCollection = (myCollection) => ({
  type: productsTypes.SET_MY_COLLECTION,
  payload: myCollection,
});

export const fetchAllProductsStart = () => ({
  type: productsTypes.FETCH_ALL_PRODUCTS_START,
});

export const fetchCountersStart = () => ({
  type: productsTypes.FETCH_COUNTERS_START,
});

export const setCounters = (counters) => ({
  type: productsTypes.SET_COUNTERS,
  payload: counters,
});
