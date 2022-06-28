import {marketData} from "src/redux/Market/market.types"

export interface Redux {
  user: any;
  productsData: any;
  cartData: any;
  marketData: marketData;
}