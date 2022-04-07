import { auth } from "./../../firebase/utils";
import { firestore } from "./../../firebase/utils";
import firebase from "firebase/app";

export const handleResetPasswordAPI = (email) => {
	const config = {
		url: "http://localhost:3000/login"
	};

	return new Promise((resolve, reject) => {
		auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				resolve();
			})
			.catch(() => {
				const err = ["Email not found. Please try again."];
				reject(err);
			});
	});
};

export const handleFetchUsers = () => {
	return new Promise((resolve, reject) => {
		const pageSize = 10;

		let ref = firestore
			.collection("users")
			.orderBy("experience", "desc")
			.limit(pageSize);

		ref
			.get()
			.then((snapshot) => {
				const totalCount = snapshot.size;

				const data = [
					...snapshot.docs.map((doc) => {
						return {
							...doc.data(),
							documentID: doc.id
						};
					})
				];

				resolve({
					data,
					queryDoc: snapshot.docs[totalCount - 1],
					isLastPage: totalCount < 1
				});
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleUpdateUserPreferences = (product) => {
	const { userID, backgroundImageOff, displayName, theme, flag } = product;

	return new Promise((resolve, reject) => {
		let ref = firestore.collection("users").doc(userID);

		if (flag === "username") ref = ref.update({ displayName: displayName });
		if (flag === "theme") ref = ref.update({ theme: theme });
		if (flag === "backgroundImage")
			ref = ref.update({ backgroundImageOff: backgroundImageOff });

		ref
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleUpdateBoxStatus = (product) => {
	const {
		userID,
		blueBoxFragments,
		purpleBoxFragments,
		watchParts,
		orangeBoxFragments,
		boosters
	} = product;

	return new Promise((resolve, reject) => {
		let ref = firestore.collection("users").doc(userID);

		if (product.flag === "getWhitebox")
			ref.update({
				whiteBox: firebase.firestore.FieldValue.increment(1),
				points: firebase.firestore.FieldValue.increment(-4)
			});
		if (product.flag === "getBluebox")
			ref.update({
				blueBox: firebase.firestore.FieldValue.increment(1),
				blueBoxFragments: firebase.firestore.FieldValue.increment(-10)
			});
		if (product.flag === "getPurplebox")
			ref.update({
				purpleBox: firebase.firestore.FieldValue.increment(1),
				purpleBoxFragments: firebase.firestore.FieldValue.increment(-10)
			});

		if (product.flag === "openWhitebox")
			ref.update({
				whiteBox: firebase.firestore.FieldValue.increment(-1),
				blueBoxFragments: blueBoxFragments,
				purpleBoxFragments: purpleBoxFragments,
				watchParts: watchParts
			});
		if (product.flag === "openBluebox")
			ref.update({
				blueBox: firebase.firestore.FieldValue.increment(-1),
				purpleBoxFragments: purpleBoxFragments,
				orangeBoxFragments: orangeBoxFragments,
				watchParts: watchParts
			});
		if (product.flag === "openPurplebox")
			ref.update({
				purpleBox: firebase.firestore.FieldValue.increment(-1),
				orangeBoxFragments: orangeBoxFragments,
				boosters: boosters,
				watchParts: watchParts
			});
		if (product.flag === "deleteWatchPart")
			ref.update({
				watchParts: watchParts
			});

		ref
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};
//new implementations
export const handleUpdateCollectionStatus = (product) => {
	const { collection, userID, boosters, points, flag } = product;
	return new Promise((resolve, reject) => {
		let ref = firestore.collection("users").doc(userID);

		ref.update({
			collection: collection
		});

		if (flag === "boosters") {
			ref.update({ boosters: boosters });
		}

		if (flag === "buy") {
			ref.update({ points: points });
		}

		ref
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleUpdateSellerStatus = (product) => {
	const { userID, points, messages } = product;
	return new Promise((resolve, reject) => {
		let ref = firestore.collection("users").doc(userID);

		ref.update({
			points: firebase.firestore.FieldValue.increment(points),
			messages: firebase.firestore.FieldValue.arrayUnion(messages)
		});

		ref
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleClearMessages = (payload) => {
	const { userID, messages } = payload;
	return new Promise((resolve, reject) => {
		let ref = firestore.collection("users").doc(userID);

		ref.update({
			messages: messages
		});

		ref
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleRemoveMessage = (payload) => {
	const { userID, messages } = payload;
	return new Promise((resolve, reject) => {
		let ref = firestore.collection("users").doc(userID);

		ref.update({
			messages: messages
		});

		ref
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};
