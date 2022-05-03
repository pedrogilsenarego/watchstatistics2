import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { checkUserIsAdmin } from "src/Utils";
import {
  setProducts,
  setLatestProducts,
  setValidationProducts,
  setProduct,
  setRandomProduct,
  fetchValidationProductsStart,
  fetchProductStart,
  setMyCollection,
  setCounters,
  setProductDescription,
} from "./products.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleFetchLatestProducts,
  handleFetchValidationProducts,
  handleFetchProduct,
  handleDeleteOrder,
  handleUpdateVote,
  handleUpdateDetails,
  handleUserVote,
  handleUserUpdateDetails,
  handleFetchRandomProduct,
  handleFetchMyCollection,
  handleFetchAllProducts,
  handleIncrementProductsCounter,
  handleGetCounters,
  handleAddProductDescriptionAdmin,
  handleAddProductDescriptionUser,
} from "./products.helpers";
import productsTypes from "./products.types";
import {
  addMessageStart,
  checkUserSession,
  updateCollectionStatus,
} from "../User/user.actions";
import {
  enableLoading,
  disableLoading,
  updateSuccessNotification,
  updateInformationNotification,
  updateFailNotification,
} from "../general/general.actions";
import { i18n } from "src/translations/i18n";

export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();

    yield handleAddProduct({
      ...payload,
      UserUID: payload.UserUID ? payload.UserUID : auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield handleIncrementProductsCounter({
      ...payload,
    });
    yield handleUserUpdateDetails({
      ...payload,
    });
  } catch (err) {
    // console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
  try {
    yield put(enableLoading());
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (err) {
    // console.log(err);
  } finally {
    yield put(disableLoading());
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* updateVote({ payload }) {
  try {
    yield handleUpdateVote({
      ...payload,
    });
    yield handleUserVote({
      ...payload,
    });
    yield put(fetchProductStart(payload.productID));
    yield put(checkUserSession());
  } catch (err) {
    // console.log(err);
  }
}

export function* onUpdateProductVoteStart() {
  yield takeLatest(productsTypes.UPDATE_PRODUCT_VOTE_START, updateVote);
}

export function* fetchLatestProducts({ payload }) {
  try {
    const latestProducts = yield handleFetchLatestProducts(payload);
    yield put(setLatestProducts(latestProducts));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchLatestProductsStart() {
  yield takeLatest(
    productsTypes.FETCH_LATEST_PRODUCTS_START,
    fetchLatestProducts
  );
}

export function* fetchValidationProducts({ payload }) {
  try {
    const validationProducts = yield handleFetchValidationProducts(payload);
    yield put(setValidationProducts(validationProducts));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchValidationProductsStart() {
  yield takeLatest(
    productsTypes.FETCH_VALIDATION_PRODUCTS_START,
    fetchValidationProducts
  );
}
export function* updateDetails({ payload }) {
  try {
    yield handleUpdateDetails({
      ...payload,
    });
    yield handleUserUpdateDetails({
      ...payload,
    });
  } catch (err) {
    // console.log(err);
  }
}

export function* onUpdateProductDetailsStart() {
  yield takeLatest(productsTypes.UPDATE_PRODUCT_DETAILS_START, updateDetails);
}

export function* fetchRandomProduct({ payload }) {
  try {
    var product = yield handleFetchRandomProduct({ ...payload });
    if (product.data.length === 0) {
      var differentPayload = { ...payload, randomValue: 1 };
      product = yield handleFetchRandomProduct(differentPayload);
    }
    const newCollection = payload.collection;
    newCollection.push(product.data[0].documentID);
    const configData = {
      ...payload,
      collection: newCollection,
    };
    yield put(updateCollectionStatus(configData));
    yield put(setRandomProduct(product));
  } catch (err) {
    // console.log(err);
  }
}
export function* onFetchRandomProductStart() {
  yield takeLatest(productsTypes.FETCH_RANDOM_PRODUCT, fetchRandomProduct);
}

//
export function* fetchMyCollection({ payload }) {
  try {
    const myCollection = yield handleFetchMyCollection(payload);
    yield put(setMyCollection(myCollection));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchMyCollectionStart() {
  yield takeLatest(productsTypes.FETCH_MY_COLLECTION_START, fetchMyCollection);
}

export function* fetchAllProducts({ payload }) {
  try {
    const products = yield handleFetchAllProducts(payload);
    yield put(setProducts(products));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchAllProductsStart() {
  yield takeLatest(productsTypes.FETCH_ALL_PRODUCTS_START, fetchAllProducts);
}

export function* fetchCounters() {
  try {
    const product = yield handleGetCounters();
    yield put(setCounters(product));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchCountersStart() {
  yield takeLatest(productsTypes.FETCH_COUNTERS_START, fetchCounters);
}

//Update Product

function* sagaAddDescription({ payload }) {
  const { description, currentUser } = payload;
  const timestamp = new Date();
  try {
    if (checkUserIsAdmin(currentUser)) {
      yield handleAddProductDescriptionAdmin(payload);
      yield put(setProductDescription(description));
      yield put(updateSuccessNotification("Product description added"));
    } else {
      yield handleAddProductDescriptionUser({
        ...payload,
        createdDate: timestamp,
      });
      yield put(
        updateInformationNotification("Product description sent for review")
      );
    }
  } catch (err) {
    yield put(
      updateFailNotification(
        `It was not possible to add a description this time`
      )
    );
  }
}
export function* onAddProductDescription() {
  yield takeLatest(productsTypes.ADD_PRODUCT_DESCRIPTION, sagaAddDescription);
}

export function* deleteOrder({ payload }) {
  const { documentID, type, user, productReference } = payload;
  try {
    yield handleDeleteOrder(documentID);
    yield put(
      updateSuccessNotification(i18n.t("notifications.success.orderDeleted"))
    );
    const deletePayload = {
      userID: user,
      messages: {
        from: "admin",
        message: `We are sorry, but your update of the type: ${type} on the watch: ${productReference} was rejected`,
      },
    };
    yield put(addMessageStart(deletePayload));
    yield put(fetchValidationProductsStart());
  } catch (err) {
    yield put(
      updateFailNotification(i18n.t("notifications.fail.orderDeleted"))
    );
  }
}

export function* onDeleteOrderStart() {
  yield takeLatest(productsTypes.DELETE_ORDER_START, deleteOrder);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteOrderStart),
    call(onFetchProductStart),
    call(onUpdateProductVoteStart),
    call(onUpdateProductDetailsStart),
    call(onFetchLatestProductsStart),
    call(onFetchValidationProductsStart),
    call(onFetchRandomProductStart),
    call(onFetchMyCollectionStart),
    call(onFetchAllProductsStart),
    call(onFetchCountersStart),
    call(onAddProductDescription),
  ]);
}
