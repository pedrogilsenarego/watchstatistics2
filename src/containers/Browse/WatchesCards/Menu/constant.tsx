import { BsSliders } from "react-icons/bs";


export const bottomMenuButtons = (
  handleFiltersVisible: any,
  productCategoryFilter: any,
  productPricesFilter: any,
  productBrandsFilter: any,
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
  if (productPricesFilter) newArray.push(productPricesFilter)
  if (productBrandsFilter) newArray.push(productBrandsFilter)
  return newArray
}
