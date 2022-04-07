export const handleRemoveMarketItem = ({
	prevMarketProducts,
	marketItemToRemove
}) => {
	return prevMarketProducts.filter(
		(item) => item.documentID !== marketItemToRemove
	);
};
