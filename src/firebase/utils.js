import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyA-fXgytx05E72388uKC2M1L1StPtHxUzc",
	authDomain: "fir-auth0-9b4cb.firebaseapp.com",
	projectId: "fir-auth0-9b4cb",
	storageBucket: "fir-auth0-9b4cb.appspot.com",
	messagingSenderId: "531249981305",
	appId: "1:531249981305:web:27efb67103ea51063731a8",
	measurementId: "G-67HVFRDG0V"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const handleUserProfile = async ({ userAuth, additionalData }) => {
	if (!userAuth) return;
	const { uid } = userAuth;

	const userRef = firestore.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const timestamp = new Date();
		const userRoles = ["user", "verified"];

		try {
			await userRef.set({
				displayName,
				email,
				createdDate: timestamp,
				userRoles,
				userVotes: ["1"],
				numberVotes: 0,
				experience: 0,
				points: 0,
				...additionalData
			});
		} catch (err) {
			// console.log(err);
		}
	}

	return userRef;
};

export const handleUserProfileSocialLogin = async ({
	userAuth,
	additionalData
}) => {
	if (!userAuth) return;
	const { uid } = userAuth;

	const userRef = firestore.doc(`users/${uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const timestamp = new Date();
		const userRoles = ["user", "verified"];

		try {
			await userRef.set({
				displayName,
				email,
				createdDate: timestamp,
				userRoles,
				userVotes: ["1"],
				numberVotes: 0,
				...additionalData
			});
		} catch (err) {
			// console.log(err);
		}
	}

	return userRef;
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};
