import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import productsReducer from "./Products/products.reducer";
import cartReducer from "./Cart/cart.reducer";
import { persistReducer } from "redux-persist";
import ordersReducer from "./Orders/orders.reducer";
import marketReducer from "./Market/market.reducer";
import storage from "redux-persist/lib/storage"; //local storage, can also be used session storage

export const rootReducer = combineReducers({
	user: userReducer,
	productsData: productsReducer,
	cartData: cartReducer,
	ordersData: ordersReducer,
	marketData: marketReducer
});

const configStorage = {
	key: "root",
	storage,
	Whitelist: ["cartData"]
};

export default persistReducer(configStorage, rootReducer);
