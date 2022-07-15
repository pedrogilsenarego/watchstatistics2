import { FaCoins, FaPuzzlePiece } from "react-icons/fa";

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
  NOOB: 8,
  BEGGINNER: 10,
  ENTHUSIAST: 11,
  MATURE: 12,
  CONOISSEUR: 12,
  GEEK_LEGEND: 12,
  GOD: 13,
};

export const openBoxParts = (typeOfBox: string): any => {
  switch (typeOfBox) {
    case "whiteBox":
      return {
        MAIN_PART: "grey",
        MAIN_FRAGMENTS: "blueBoxFragments",
        SECONDARY_PART: "white",
        SECONDARY_FRAGMENTS: "purpleBoxFragments",
        THIRD_PART: "lightGreen",
        MAIN_PART_STRING: "Grey",
        SECONDARY_PART_STRING: "White",
        THIRD_PART_STRING: "Light Green",
        SECONDARY_FRAGMENT_STRING: "Blue",
        THIRD_FRAGMENTS_STRING: "Purple"
      };
    case "blueBox":
      return {
        MAIN_PART: "white",
        MAIN_FRAGMENTS: "purpleBoxFragments",
        SECONDARY_PART: "lightGreen",
        SECONDARY_FRAGMENTS: "orangeBoxFragments",
        THIRD_PART: "darkGreen",
        MAIN_PART_STRING: "White",
        SECONDARY_PART_STRING: "Light Green",
        THIRD_PART_STRING: "Dark Green",
        SECONDARY_FRAGMENT_STRING: "Purple",
        THIRD_FRAGMENTS_STRING: "Orange"
      };
    case "purpleBox":
      return {
        MAIN_PART: "lightGreen",
        MAIN_FRAGMENTS: "orangeBoxFragments",
        SECONDARY_PART: "darkGreen",
        SECONDARY_FRAGMENTS: "boosters",
        THIRD_PART: "lightBlue",
        MAIN_PART_STRING: "Light Green",
        SECONDARY_PART_STRING: "Dark Green",
        THIRD_PART_STRING: "Light Blue",
        SECONDARY_FRAGMENT_STRING: "Orange",
        THIRD_FRAGMENTS_STRING: "Booster"
      };
    default: return {}
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

export const getBox = (typeOfBox: string) => {
  switch (typeOfBox) {
    case typeBox.WHITE_BOX: return 4;
    case typeBox.BLUE_BOX: return 10;
    case typeBox.PURPLE_BOX: return 10;
    default: return 4
  }
}

export const typeCurrency = {
  POINTS: "points",
  BLUE_BOX_FRAGMENTS: "blueBoxFragments",
  PURPLE_BOX_FRAGMENTS: "purpleBoxFragments"
}

export const typeBox = {
  WHITE_BOX: "whiteBox",
  BLUE_BOX: "blueBox",
  PURPLE_BOX: "purpleBox"
}

export const getShopNames = (value: string) => {
  switch (value) {
    case typeBox.WHITE_BOX: return "White Box";
    case typeBox.BLUE_BOX: return "Blue Box";
    case typeBox.PURPLE_BOX: return "Purple Box";
    default: return null
  }
}

export const getShopCurrencyTypes = (value: string) => {
  switch (value) {
    case typeCurrency.POINTS: return <FaCoins color="orange" />;
    case typeCurrency.BLUE_BOX_FRAGMENTS: return <FaPuzzlePiece color="lightBlue" />;
    case typeCurrency.PURPLE_BOX_FRAGMENTS: return <FaPuzzlePiece color="purple" />;
    default: return null
  }
}