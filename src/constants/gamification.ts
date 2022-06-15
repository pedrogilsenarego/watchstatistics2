import { TypeOfBox } from "src/containers/WatchLab/types";

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
  PRODUCT_CATEGORY: 2,
  PRODUCT_BRAND: 2,
  PRODUCT_NAME: 2,
  PRODUCT_REFERENCE: 2,
  PRODUCT_PRICE: 2,
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
  rewards.PRODUCT_PRICE +
  rewards.PRODUCT_CATEGORY;

export const maxPointsNewWatchBonusFull = 10;

//rank calculations
export const experienceCap = {
  NOOB: 20,
  BEGGINNER: 100,
  ENTHUSIAST: 200,
  MATURE: 500,
  CONNOISSEUR: 1500,
  GEEK_LEGEND: 5000,
};

export const rankColors = {
  NOOB: "#ffffff66",
  BEGGINNER: "white",
  ENTHUSIAST: "green",
  MATURE: "blue",
  CONOISSEUR: "puple",
  GEEK_LEGEND: "orange",
  GOD: "red",
};

export const bagSize = {
  NOOB: 10,
  BEGGINNER: 12,
  ENTHUSIAST: 14,
  MATURE: 16,
  CONOISSEUR: 18,
  GEEK_LEGEND: 20,
  GOD: 25,
};

export const openBoxParts = (typeOfBox: TypeOfBox) => {
  switch (typeOfBox) {
    case "whiteBox":
      return {
        MAIN_PART: "grey",
        SECONDARY_PART: "white",
        THIRD_PART: "lightGreen",
      };
  }
};

export const openBoxPartsString = (typeOfBox: TypeOfBox) => {
  switch (typeOfBox) {
    case "whiteBox":
      return {
        MAIN_PART: "Grey",
        SECONDARY_PART: "White",
        THIRD_PART: "Light Green",
      };
  }
};

export const openBoxPartsPercentage = {
  SECONDARY_PART: 20,
  THIRD_PART: 1,
};

export const openBoxFragmentsPercentage = {
  SECONDARY_FRAGMENTS_MIN: 1,
  SECONDARY_FRAGMENTS_MAX: 3,
  THIRD_FRAGMENTS: 5, //percentage
};

export const getBox = {
  WHITE_BOX: 4, //points
};
