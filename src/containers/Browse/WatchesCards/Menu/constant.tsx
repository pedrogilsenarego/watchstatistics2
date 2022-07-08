import { BsSliders } from "react-icons/bs";

export const bottomMenuButtons = (
  handleFiltersVisible: any,
  productCategoryFilter: any
) => {
  let newArray =
    [
      {
        title: "Filters",
        icon: <BsSliders size='1.5em' />,
        onClick: handleFiltersVisible,
      },

    ];
  if (productCategoryFilter) newArray.push(productCategoryFilter)
  return newArray
}
