import { firestore } from "./../../firebase/utils";

export const handleAddToAuction = (order) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection("market")
			.doc()
			.set(order)
			.then(() => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const handleFetchMarketProducts = ({
	startAfterDoc,
	persistProducts = []
}) => {
	return new Promise((resolve, reject) => {
		const pageSize = 10;
		let ref = firestore
			.collection("market")
			.orderBy("orderCreatedDate")
			.limit(pageSize);

		if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

		ref
			.get()
			.then((snapshot) => {
				const totalCount = snapshot.size;

				const data = [
					...persistProducts,
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

export const handleDeleteProduct = (documentID) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection("market")
			.doc(documentID)
			.delete()
			.then(() => {
				//console.log(documentID, 2);
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};
