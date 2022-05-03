import ordersTypes from "./orders.types";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
  handleDeleteOrder,
} from "./orders.helpers";
import { auth } from "./../../firebase/utils";
import { setUserOrderHistory, setOrderDetails } from "./orders.actions";
import { i18n } from "src/translations/i18n";
import {
  updateSuccessNotification,
  updateFailNotification,
} from "../general/general.actions";
import { addMessageStart } from "../User/user.actions";
import { fetchValidationProductsStart } from "../Products/products.actions";

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });
  } catch (err) {
    // console.log(err);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    console.log(order);
    yield put(setOrderDetails(order));
  } catch (err) {
    // console.log(err);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
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
        from: "Admin",
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
  yield takeLatest(ordersTypes.DELETE_ORDER_START, deleteOrder);
}

export default function* ordersSagas() {
  yield all([
    call(onDeleteOrderStart),
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}
