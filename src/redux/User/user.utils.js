export const existingCollectionItem = ({ prevCartItems, nextCartItem }) => {
	return prevCartItems.find(
		(cartItem) => cartItem.reference === nextCartItem.reference
	);
};

export const handleAddToCollection = ({
	prevCollectionItems,
	nextCollectionItem
}) => {
	const cartItemExists = existingCollectionItem({
		prevCollectionItems,
		nextCollectionItem
	});

	if (cartItemExists) {
		return prevCollectionItems.map((cartItem) =>
			cartItem.reference === nextCollectionItem.reference
				? {
						...cartItem
				  }
				: cartItem
		);
	}

	return [
		...prevCollectionItems,
		{
			...nextCollectionItem
		}
	];
};
