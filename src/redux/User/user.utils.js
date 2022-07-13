export const existingCollectionItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    (cartItem) => cartItem.reference === nextCartItem.reference
  );
};

export const handleAddToCollection = ({
  prevCollectionItems,
  nextCollectionItem,
}) => {
  const cartItemExists = existingCollectionItem({
    prevCollectionItems,
    nextCollectionItem,
  });

  if (cartItemExists) {
    return prevCollectionItems.map((cartItem) =>
      cartItem.reference === nextCollectionItem.reference
        ? {
            ...cartItem,
          }
        : cartItem
    );
  }

  return [
    ...prevCollectionItems,
    {
      ...nextCollectionItem,
    },
  ];
};

export const handleUpdateBoxState = ({ prevCurrentUser, listItems }) => {
  const currentUser = { ...prevCurrentUser };
  Object.keys(listItems).forEach((key) => {
    currentUser[key] = currentUser[key] + listItems[key].value;
    currentUser[listItems[key].typeCurrency] =
      currentUser[listItems[key].typeCurrency] + listItems[key].currency;
  });
  return currentUser;
};
