import { firestore } from "./../../firebase/utils";
import firebase from "firebase/app";

export const handleAddProduct = (product) => {
  const admin = product.admin;
  const where = admin ? "products" : "orders";
  delete product.admin;

  return new Promise((resolve, reject) => {
    firestore
      .collection(where)
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleIncrementProductsCounter = (product) => {
  const admin = product.admin;
  if (!admin) return;
  return new Promise((resolve, reject) => {
    firestore
      .collection("watch-statistics")
      .doc("counters")
      .update({
        products: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = ({
  filterType,
  filter,
  pageSize,
  sort,
  startAfterDoc,
  persistProducts = [],
  productCategory,
  productPrices,
  productBrands
}) => {
  return new Promise((resolve, reject) => {
    const where = filter;
    const sorting = sort ? sort : "desc"

    let ref = firestore
      .collection("products")
      .orderBy("avgTotal", sorting)
      .limit(pageSize);
    //old
    if (filterType) ref = ref.where(where, "==", filterType);
    //new
    if (productCategory) ref = ref.where("productCategory", "==", productCategory)
    if (productPrices) ref=ref.where("productPriceBrackets", "==", productPrices)
    if (productBrands) ref=ref.where("productBrand", "==", productBrands)
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
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
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
      .collection("orders")
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

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUpdateVote = (product) => {
  const {
    productID,
    numberVotesOwn,
    numberVotesNotOwn,
    votationsNonOwn,
    votationsOwn,
    avgVotationsOwn,
    avgVotationsNotOwn,
    avgTotal,
  } = product;
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .update({
        numberVotesOwn,
        numberVotesNotOwn,
        votationsNonOwn,
        votationsOwn,
        avgVotationsOwn,
        avgVotationsNotOwn,
        avgTotal,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUserVote = (product) => {
  const { userID, userVotes, numberVotes, experience, points } = product;
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(userID)
      .update({
        userVotes: userVotes,
        numberVotes: numberVotes,
        experience: experience,
        points: points,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchLatestProducts = ({
  filterType,
  filter,
  pageSize,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    const where = filter;

    let ref = firestore
      .collection("products")
      .orderBy("createdDate", "desc")
      .limit(pageSize);

    if (filterType) ref = ref.where(where, "==", filterType);
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
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//new implementations
export const handleFetchValidationProducts = ({
  filterType,
  filter,
  pageSize,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    const where = filter;

    let ref = firestore
      .collection("orders")
      .orderBy("createdDate")
      .limit(pageSize);

    if (filterType) ref = ref.where(where, "==", filterType);
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
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//new implementation
export const handleUpdateDetails = (product) => {
  const {
    productID,
    caliber,
    movement,
    caseSize,
    productionYears,
    caseMaterial,
    waterResistance,
  } = product;
  const data = {
    caliber,
    movement,
    productionYears,
    caseSize,
    caseMaterial,
    waterResistance,
  };
  if (!movement) delete data.movement;
  if (!caliber) delete data.caliber;
  if (!productionYears) delete data.productionYears;
  if (!caseSize) delete data.caseSize;
  if (!caseMaterial) delete data.caseMaterial;
  if (!waterResistance) delete data.waterResistance;

  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .update(data)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUserUpdateDetails = (product) => {
  const {
    UserUID,
    movement,
    caliber,
    productionYears,
    caseSize,
    caseMaterial,
    waterResistance,
    productDesc,
  } = product;
  var incrementExp = 0;
  var incrementWatches = 0;
  var incrementWhiteBox = 0;
  var incrementBlueBox = 0;
  if (!productDesc) {
    if (waterResistance) {
      incrementExp = incrementExp + 0.5;
    }
    if (movement) {
      incrementExp = incrementExp + 0.5;
    }
    if (caliber) {
      incrementExp = incrementExp + 0.5;
    }
    if (productionYears) {
      incrementExp = incrementExp + 0.5;
    }
    if (caseSize) {
      incrementExp = incrementExp + 0.5;
    }
    if (caseMaterial) {
      incrementExp = incrementExp + 0.5;
    }
  }
  if (productDesc) {
    incrementExp = incrementExp + 4;
    incrementWatches = incrementWatches + 1;
    incrementWhiteBox = incrementWhiteBox + 1;
    incrementBlueBox = incrementBlueBox + 1;
  }

  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(UserUID)
      .update({
        experience: firebase.firestore.FieldValue.increment(incrementExp),
        points: firebase.firestore.FieldValue.increment(incrementExp),
        watchesSubmited:
          firebase.firestore.FieldValue.increment(incrementWatches),
        whiteBox: firebase.firestore.FieldValue.increment(incrementWhiteBox),
        blueBox: firebase.firestore.FieldValue.increment(incrementBlueBox),
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleFetchRandomProduct = ({
  fusionPrice,
  randomValue,
  boostWatch,
  flag,
}) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("products");

    const rValue = randomValue.toString();
    ref = ref.orderBy("avgTotal").limit(1);
    ref = ref.where("productPriceBrackets", "==", fusionPrice);
    ref = ref.where("avgTotal", ">=", rValue);

    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//
export const handleFetchMyCollection = ({
  myCollection,

  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("products")

      .where("__name__", "in", myCollection);

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchAllProducts = () => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("products");

    ref
      .get()
      .then((snapshot) => {
        const data = [
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetCounters = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("watch-statistics")
      .doc("counters")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
