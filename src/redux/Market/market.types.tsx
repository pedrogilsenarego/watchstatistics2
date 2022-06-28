const marketTypes = {
  ADD_TO_AUCTION: "ADD_TO_AUCTION",
  FETCH_MARKET_PRODUCTS_START: "FETCH_MARKET_PRODUCTS_START",
  SET_MARKET_PRODUCTS: "SET_MARKEY_PRODUCTS",
  BUY_MARKET_PRODUCT_START: "BUY_MARKET_PRODUCT_START",
  REMOVE_MARKET_ITEM: "REMOVE_MARKET_ITEM"
};

export interface marketProducts {
  documentID: string
  id: string;
  price: number;
  generalState: number;
  polishState: number;
  movementState: number;
}

export interface marketData {

  marketProducts: marketProducts[]
}

export default marketTypes;
