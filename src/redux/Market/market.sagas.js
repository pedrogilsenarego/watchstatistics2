import { takeLatest, all, put, call } from "redux-saga/effects";
import { auth } from "./../../firebase/utils";
import marketTypes from "./market.types";
import {
	handleAddToAuction,
	handleFetchMarketProducts,
	handleDeleteProduct
} from "./market.helpers.js";
import { setMarketProducts, removeMarketItem } from "./market.actions";

export function* addToAuction({ payload }) {
	try {
		const timestamps = new Date();
		yield handleAddToAuction({
			...payload,
			UserUID: auth.currentUser.uid,
			orderCreatedDate: timestamps
		});
	} catch (err) {}
}

export function* onAddToAuctionStart() {
	yield takeLatest(marketTypes.ADD_TO_AUCTION, addToAuction);
}

export function* fetchMarketProducts({ payload }) {
	try {
		const products = yield handleFetchMarketProducts(payload);
		yield put(setMarketProducts(products.data));
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchMarketProductsStart() {
	yield takeLatest(
		marketTypes.FETCH_MARKET_PRODUCTS_START,
		fetchMarketProducts
	);
}

export function* buyProduct({ payload }) {
	const { documentID } = payload;

	try {
		yield handleDeleteProduct(documentID);
		yield put(removeMarketItem(documentID));
	} catch (err) {
		// console.log(err);
	}
}

export function* onBuyProductStart() {
	yield takeLatest(marketTypes.BUY_MARKET_PRODUCT_START, buyProduct);
}

export default function* marketSagas() {
	yield all([
		call(onAddToAuctionStart),
		call(onFetchMarketProductsStart),
		call(onBuyProductStart)
	]);
}
