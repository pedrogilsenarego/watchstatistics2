export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
	if (prevCartItems) {
		return prevCartItems.find(
			(cartItem) => cartItem.reference === nextCartItem.reference
		);
	}
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
	const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });

	if (cartItemExists) {
		return prevCartItems.map((cartItem) =>
			cartItem.reference === nextCartItem.reference
				? {
						...cartItem
				  }
				: cartItem
		);
	}
	if (prevCartItems) {
		return [
			...prevCartItems,
			{
				...nextCartItem
			}
		];
	} else return [{ ...nextCartItem }];
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
	return prevCartItems.filter(
		(item) => item.reference !== cartItemToRemove.reference
	);
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
	const existingCartItem = prevCartItems.find(
		(cartItem) => cartItem.documentID === cartItemToReduce.documentID
	);

	if (existingCartItem.quantity === 1) {
		return prevCartItems.filter(
			(cartItem) => cartItem.documentID !== existingCartItem.documentID
		);
	}

	return prevCartItems.map((cartItem) =>
		cartItem.documentID === existingCartItem.documentID
			? {
					...cartItem,
					quantity: cartItem.quantity - 1
			  }
			: cartItem
	);
};

//new implementation

/* export const existingBoosterItem = ({ prevCartItems, nextCartItem }) => {
	if (prevCartItems) {
		return prevCartItems.productPriceBrackets.find(
			(cartItem) => cartItem.reference === nextCartItem.reference
		);
	}
}; */

export const handleAddToBoosterCart = ({ prevCartItems, nextCartItem }) => {
	if (nextCartItem.productPriceBrackets === "0-200€") {
		return { ...prevCartItems, a: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "200-500€") {
		return { ...prevCartItems, b: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "500-1000€") {
		return { ...prevCartItems, c: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "1000-5000€") {
		return { ...prevCartItems, d: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "5000-10.000€") {
		return { ...prevCartItems, e: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "10.000-30.000€") {
		return { ...prevCartItems, f: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "30.000-50.000€") {
		return { ...prevCartItems, g: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "50.000-100.000€") {
		return { ...prevCartItems, h: nextCartItem };
	}
	if (nextCartItem.productPriceBrackets === "100.000€+") {
		return { ...prevCartItems, i: nextCartItem };
	}
};
