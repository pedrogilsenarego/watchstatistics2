import { takeLatest, put, all, call } from "redux-saga/effects";
import { checkUserIsAdmin } from "src/Utils";
import {
  setProducts,
  setLatestProducts,
  setValidationProducts,
  setProduct,
  setRandomProduct,
  fetchProductStart,
  setMyCollection,
  setCounters,
  setProductDescription,
  setProductAdditionalData,
  setProductPicture,
  setProductListDetail,
} from "./products.actions";
import {
  handleAddProductAdmin,
  handleFetchProducts,
  handleFetchLatestProducts,
  handleFetchValidationProducts,
  handleFetchProduct,
  handleUpdateVote,
  handleUpdateDetails,
  handleUserVote,
  handleUserUpdateDetails,
  handleFetchRandomProduct,
  handleFetchMyCollection,
  handleFetchAllProducts,
  handleIncrementProductsCounter,
  handleGetCounters,
  handleAddProductUpdateAdmin,
  handleAddProductUpdateUser,
} from "./products.helpers";
import productsTypes from "./products.types";
import { checkUserSession, updateCollectionStatus } from "../User/user.actions";
import {
  enableLoading,
  disableLoading,
  updateSuccessNotification,
  updateInformationNotification,
  updateFailNotification,
} from "../general/general.actions";
import { i18n } from "src/translations/i18n";

//New Watch Submit

export function* addProduct({ payload }) {
  try {
    const { currentUser } = payload;
    const timestamp = new Date();
    if (checkUserIsAdmin(currentUser)) {
      delete payload.currentUser;
      yield handleAddProductAdmin({
        ...payload,
        createdDate: timestamp,
      });
      yield handleIncrementProductsCounter(payload);
      yield put(
        updateSuccessNotification(i18n.t("notifications.success.newWatch"))
      );
    } else {
      delete payload.currentUser;
      yield put(
        updateInformationNotification(
          i18n.t("notifications.information.newWatch")
        )
      );
    }
  } catch (err) {
    yield put(updateFailNotification(i18n.t("notifications.fail.newWatch")));
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

//!!!!!!!!!!!!Update Product!!!!!!!!!!!!!!!!!

function* sagaAddDescription({ payload }) {
  const { productDesc, currentUser } = payload;
  const timestamp = new Date();
  try {
    if (checkUserIsAdmin(currentUser)) {
      yield handleAddProductUpdateAdmin(payload);
      yield put(setProductDescription(productDesc));
      yield put(updateSuccessNotification("Product description added"));
    } else {
      yield handleAddProductUpdateUser({
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

function* sagaAddAdditionalData({ payload }) {
  const { additionalData, currentUser } = payload;
  const timestamp = new Date();
  try {
    if (checkUserIsAdmin(currentUser)) {
      yield handleAddProductUpdateAdmin(payload);
      yield put(setProductAdditionalData(additionalData));
      yield put(
        updateSuccessNotification(
          i18n.t("notifications.success.updateProductAdditionalData")
        )
      );
    } else {
      yield handleAddProductUpdateUser({
        ...payload,
        createdDate: timestamp,
      });
      yield put(
        updateInformationNotification(
          i18n.t("notifications.information.updateProductAdditionalData")
        )
      );
    }
  } catch (err) {
    yield put(
      updateFailNotification(
        i18n.t("notifications.fail.updateProductAdditionalData")
      )
    );
  }
}
export function* onAddProductAdditionalData() {
  yield takeLatest(
    productsTypes.ADD_PRODUCT_ADDITIONAL_DATA,
    sagaAddAdditionalData
  );
}

function* sagaAddPicture({ payload }) {
  const { productThumbnail, currentUser } = payload;
  const timestamp = new Date();
  try {
    if (checkUserIsAdmin(currentUser)) {
      yield handleAddProductUpdateAdmin(payload);
      yield put(setProductPicture(productThumbnail));
      yield put(
        updateSuccessNotification(
          i18n.t("notifications.success.updateProductPicture")
        )
      );
    } else {
      yield handleAddProductUpdateUser({
        ...payload,
        createdDate: timestamp,
      });
      yield put(
        updateInformationNotification(
          i18n.t("notifications.information.updateProductPicture")
        )
      );
    }
  } catch (err) {
    yield put(
      updateFailNotification(i18n.t("notifications.fail.updateProductPicture"))
    );
  }
}
export function* onAddProductPicture() {
  yield takeLatest(productsTypes.ADD_PRODUCT_PICTURE, sagaAddPicture);
}

function* sagaAddProductListDetails({ payload }) {
  const { currentUser } = payload;
  const timestamp = new Date();
  try {
    if (checkUserIsAdmin(currentUser)) {
      yield handleAddProductUpdateAdmin(payload);
      yield put(setProductListDetail(payload));
      yield put(
        updateSuccessNotification(
          i18n.t("notifications.success.updateProductListDetails")
        )
      );
    } else {
      yield handleAddProductUpdateUser({
        ...payload,
        createdDate: timestamp,
      });
      yield put(
        updateInformationNotification(
          i18n.t("notifications.information.updateProductListDetails")
        )
      );
    }
  } catch (err) {
    yield put(
      updateFailNotification(
        i18n.t("notifications.fail.updateProductListDetails")
      )
    );
  }
}
export function* onAddProductListDetails() {
  yield takeLatest(
    productsTypes.ADD_PRODUCT_LIST_DETAILS,
    sagaAddProductListDetails
  );
}

export default function* productsSagas() {
  yield all([
    call(onAddProductListDetails),
    call(onAddProductPicture),
    call(onAddProductStart),
    call(onFetchProductsStart),
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
    call(onAddProductAdditionalData),
  ]);
}
