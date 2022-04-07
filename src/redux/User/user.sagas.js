import { takeLatest, call, all, put } from "redux-saga/effects";
import {
	auth,
	handleUserProfile,
	handleUserProfileSocialLogin,
	getCurrentUser,
	GoogleProvider
} from "./../../firebase/utils";
import userTypes from "./user.types";
import {
	signInSuccess,
	signOutUserSuccess,
	resetPasswordSuccess,
	userError,
	setUsers
} from "./user.actions";
import {
	handleResetPasswordAPI,
	handleFetchUsers,
	handleUpdateUserPreferences,
	handleUpdateBoxStatus,
	handleUpdateCollectionStatus,
	handleUpdateSellerStatus,
	handleClearMessages,
	handleRemoveMessage
} from "./user.helpers";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
	try {
		const userRef = yield call(handleUserProfile, {
			userAuth: user,
			additionalData
		});
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data()
			})
		);
	} catch (err) {
		// console.log(err);
	}
}

export function* getSnapshotFromUserAuthSocialLogin(user, additionalData = {}) {
	try {
		const userRef = yield call(handleUserProfileSocialLogin, {
			userAuth: user,
			additionalData
		});
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data()
			})
		);
	} catch (err) {
		// console.log(err);
	}
}

export function* emailSignIn({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		// console.log(err);
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (err) {
		// console.log(err);
	}
}

export function* onCheckUserSession() {
	yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
	try {
		yield auth.signOut();
		yield put(signOutUserSuccess());
	} catch (err) {
		// console.log(err);
	}
}

export function* onSignOutUserStart() {
	yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
	payload: { displayName, email, password, confirmPassword }
}) {
	if (password !== confirmPassword) {
		const err = ["Password Don't match"];
		yield put(userError(err));
		return;
	}

	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		//yield auth.currentUser.sendEmailVerification();
		const additionalData = { displayName };
		yield getSnapshotFromUserAuth(user, additionalData);
	} catch (err) {
		console.log(err);
	}
}

export function* onSignUpUserStart() {
	yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email } }) {
	try {
		yield call(handleResetPasswordAPI, email);
		yield put(resetPasswordSuccess());
	} catch (err) {
		yield put(userError(err));
	}
}

export function* onResetPasswordStart() {
	yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
	try {
		const { user } = yield auth.signInWithPopup(GoogleProvider);
		yield getSnapshotFromUserAuthSocialLogin(user);
	} catch (err) {
		// console.log(err);
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* fetchUsers() {
	try {
		const users = yield handleFetchUsers();
		yield put(setUsers(users));
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchUsersStart() {
	yield takeLatest(userTypes.FETCH_USERS_START, fetchUsers);
}
export function* updateUserPreference({ payload }) {
	try {
		yield handleUpdateUserPreferences({
			...payload
		});
	} catch (err) {
		// console.log(err);
	}
}

export function* onUpdateUserPreferencesStart() {
	yield takeLatest(userTypes.SET_PREFERENCES, updateUserPreference);
}

export function* updateBoxState({ payload }) {
	try {
		yield handleUpdateBoxStatus({
			...payload
		});
	} catch (err) {
		// console.log(err);
	}
}
export function* onUpdateBoxStatus() {
	yield takeLatest(userTypes.UPDATE_BOX_STATE, updateBoxState);
}

//implementations
export function* updateCollectionState({ payload }) {
	try {
		yield handleUpdateCollectionStatus({
			...payload
		});
	} catch (err) {
		// console.log(err);
	}
}
export function* onUpdateCollectionStatus() {
	yield takeLatest(userTypes.UPDATE_COLLECTION_STATE, updateCollectionState);
}

export function* updateSellerState({ payload }) {
	try {
		yield handleUpdateSellerStatus({
			...payload
		});
	} catch (err) {
		// console.log(err);
	}
}
export function* onUpdateSellerStatus() {
	yield takeLatest(userTypes.UPDATE_SELLER_STATE, updateSellerState);
}

export function* clearMessagesSaga({ payload }) {
	try {
		yield handleClearMessages({ ...payload });
	} catch (err) {
		// console.log(err);
	}
}
export function* onClearMessages() {
	yield takeLatest(userTypes.CLEAR_MESSAGES, clearMessagesSaga);
}

export function* removeMessagesSaga({ payload }) {
	try {
		yield handleRemoveMessage({ ...payload });
	} catch (err) {
		// console.log(err);
	}
}
export function* onRemoveMessage() {
	yield takeLatest(userTypes.REMOVE_MESSAGE, removeMessagesSaga);
}

export default function* userSagas() {
	yield all([
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutUserStart),
		call(onSignUpUserStart),
		call(onResetPasswordStart),
		call(onGoogleSignInStart),
		call(onFetchUsersStart),
		call(onUpdateUserPreferencesStart),
		call(onUpdateBoxStatus),
		call(onUpdateCollectionStatus),
		call(onUpdateSellerStatus),
		call(onClearMessages),
		call(onRemoveMessage)
	]);
}
