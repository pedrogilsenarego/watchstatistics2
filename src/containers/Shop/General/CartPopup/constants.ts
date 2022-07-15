export const actions = (
  handleBuyFromCart: any,
  setOpenPopup: (openPopup: boolean) => void
) => [
  {
    title: "Back",
    onClick: () => setOpenPopup(false),
  },
  {
    title: "Confirm",
    onClick: () => {
      handleBuyFromCart();
      setOpenPopup(false);
    },
  },
];
