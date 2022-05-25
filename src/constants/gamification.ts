// points per entry
export const rewards = {
  PRODUCT_DESCRIPTION: 2,
  PRODUCT_ADDITIONAL_DATA: 1,
  PRODUCT_PICTURE: 1,
  PRODUCT_MOVEMENT: 1,
  PRODUCT_CALIBER: 1,
  PRODUCT_YEARS: 1,
  PRODUCT_CASE_SIZE: 1,
  PRODUCT_CASE_MATERIAL: 1,
  PRODUCT_WATER_RESISTANCE: 1,
  PRODUCT_BRAND:2,
  PRODUCT_NAME:2,
  PRODUCT_REFERENCE:2,
  PRODUCT_PRICE:2,
};

//number of entries that can exist
export const rewardsEntries = {
  PRODUCT_ADDITIONAL_DATA: 4,
  PRODUCT_PICTURE: 4,
};

export const maxPointsNewProduct =
  rewards.PRODUCT_DESCRIPTION +
  rewards.PRODUCT_ADDITIONAL_DATA * rewardsEntries.PRODUCT_ADDITIONAL_DATA +
  rewards.PRODUCT_PICTURE * rewardsEntries.PRODUCT_PICTURE + 
  rewards.PRODUCT_MOVEMENT +
  rewards.PRODUCT_CALIBER +
  rewards.PRODUCT_YEARS +
  rewards.PRODUCT_CASE_SIZE +
  rewards.PRODUCT_CASE_MATERIAL +
  rewards.PRODUCT_WATER_RESISTANCE +
  rewards.PRODUCT_BRAND +
  rewards.PRODUCT_NAME + 
  rewards.PRODUCT_REFERENCE +
  rewards.PRODUCT_PRICE

export const maxPointsNewWatchBonusFull = 10

