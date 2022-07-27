import { experienceCap, rankColors, bagSize } from "src/constants/gamification";
import { getRandomInt, randomWeightedNumber } from "./math";
import Case from "src/assets/Case.svg";
import Bracelet from "src/assets/Bracelet.svg";
import Movement from "src/assets/Movement.svg";
import Crown from "src/assets/Crown.svg";
import Glass from "src/assets/Glass.svg";

export interface Rank {
  rank: string;
  color: string;
  progress: number;
}

export const rank = (experience: number): Rank | undefined => {
  switch (true) {
    case experience < experienceCap.NOOB: {
      return {
        rank: "Noob",
        color: rankColors.NOOB,
        progress: (experience / experienceCap.NOOB) * 100,
      };
    }
    case experience < experienceCap.BEGGINNER:
      return {
        rank: "Beginner",
        color: rankColors.BEGGINNER,
        progress:
          ((experience - experienceCap.NOOB) /
            (experienceCap.BEGGINNER - experienceCap.NOOB)) *
          100,
      };
    case experience < experienceCap.ENTHUSIAST:
      return {
        rank: "Enthusiast",
        color: rankColors.ENTHUSIAST,
        progress:
          ((experience - experienceCap.BEGGINNER) /
            (experienceCap.ENTHUSIAST - experienceCap.BEGGINNER)) *
          100,
      };
    case experience < experienceCap.MATURE:
      return {
        rank: "Mature",
        color: rankColors.MATURE,
        progress:
          ((experience - experienceCap.ENTHUSIAST) /
            (experienceCap.MATURE - experienceCap.ENTHUSIAST)) *
          100,
      };
    case experience < experienceCap.CONNOISSEUR:
      return {
        rank: "Connoisseour",
        color: rankColors.CONOISSEUR,
        progress:
          ((experience - experienceCap.MATURE) /
            (experienceCap.CONNOISSEUR - experienceCap.MATURE)) *
          100,
      };
    case experience < experienceCap.GEEK_LEGEND:
      return {
        rank: "Geek Legend",
        color: rankColors.GEEK_LEGEND,
        progress:
          ((experience - experienceCap.CONNOISSEUR) /
            (experienceCap.GEEK_LEGEND - experienceCap.CONNOISSEUR)) *
          100,
      };
    case experience >= experienceCap.GEEK_LEGEND:
      return { rank: rankColors.GOD, color: "red", progress: 100 };
    default:
      return {
        rank: "Noob",
        color: rankColors.NOOB,
        progress: (experience / experienceCap.NOOB) * 100,
      };
  }
};

export const bagSizeHelper = (experience: number) => {
  switch (true) {
    case experience < experienceCap.NOOB:
      return bagSize.NOOB;
    case experience < experienceCap.BEGGINNER:
      return bagSize.BEGGINNER;
    case experience < experienceCap.ENTHUSIAST:
      return bagSize.ENTHUSIAST;
    case experience < experienceCap.MATURE:
      return bagSize.MATURE;
    case experience < experienceCap.CONNOISSEUR:
      return bagSize.CONOISSEUR;
    case experience < experienceCap.GEEK_LEGEND:
      return bagSize.GEEK_LEGEND;
    case experience >= experienceCap.GEEK_LEGEND:
      return bagSize.GOD;
    default:
      return bagSize.NOOB;
  }
};

export function getRandomWatchPart() {
  const a = getRandomInt(1, 5);
  if (a === 1) return "Case";
  if (a === 2) return "Movement";
  if (a === 3) return "Crown";
  if (a === 4) return "Glass";
  if (a === 5) return "Bracelet";
}

export function getRandomPart(color: string) {
  const a = getRandomWatchPart();
  if (color === "grey") {
    return "0" + a;
  }
  if (color === "white") {
    return "1" + a;
  }
  if (color === "lightGreen") {
    return "2" + a;
  }
  if (color === "darkGreen") {
    return "3" + a;
  }
  if (color === "lightBlue") {
    return "4" + a;
  }
  if (color === "darkBlue") {
    return "5" + a;
  }
  if (color === "purple") {
    return "6" + a;
  }
  if (color === "orange") {
    return "7" + a;
  }
  if (color === "red") {
    return "8" + a;
  }
}

export const LinearProgressBarColor = (value: number) => {
  if (value < 2) return "grey";
  if (value < 4) return "white";
  if (value < 7) return "lightGreen";
  if (value < 10) return "darkGreen";
  if (value < 14) return "lightBlue";
  if (value < 18) return "darkBlue";
  if (value < 22) return "purple";
  if (value < 27) return "orange";
  if (value < 33) return "red";
  else return "grey";
};

export const colorWatchParts = (watchParts: string) => {
  let fusionPrice = watchParts.charAt(0);
  if (fusionPrice === "0") return "#ffffff66";
  if (fusionPrice === "1") return "#ffffff";
  if (fusionPrice === "2") return "lightGreen";
  if (fusionPrice === "3") return "darkGreen";
  if (fusionPrice === "4") return "lightBlue";
  if (fusionPrice === "5") return "darkBlue";
  if (fusionPrice === "6") return "purple";
  if (fusionPrice === "7") return "orange";
  if (fusionPrice === "8") return "red";
};

export const whatImage = (item: string) => {
  if (item === "Case") return Case;
  if (item === "Glass") return Glass;
  if (item === "Bracelet") return Bracelet;
  if (item === "Movement") return Movement;
  if (item === "Crown") return Crown;
  else return null;
};

export const LinearProgressBarColor2 = (value: number) => {
  if (value < 2) return "black";
  if (value < 4) return "grey";
  if (value < 7) return "white";
  if (value < 10) return "lightGreen";
  if (value < 14) return "darkGreen";
  if (value < 18) return "lightBlue";
  if (value < 22) return "darkBlue";
  if (value < 27) return "purple";
  if (value < 33) return "orange";
  else return "black";
};

export const LinearProgressBarFormat = (value: number) => {
  if (value === undefined) return 0
  if (value < 2) return value * 50;
  if (value < 4) return (value - 1) * 20;
  if (value < 7) return (value - 3) * 30;
  if (value < 10) return (value - 6) * 30;
  if (value < 14) return (value - 9) * 25;
  if (value < 18) return (value - 13) * 25;
  if (value < 22) return (value - 17) * 25;
  if (value < 27) return (value - 21) * 20;
  if (value < 33) return (value - 26) * 17;
};

export const priceWatchParts = (watchParts: string[] | string) => {
  let newArray = watchParts;
  let fusionPrice = newArray[0];
  if (fusionPrice === "0") return "0-200€";
  if (fusionPrice === "1") return "200-500€";
  if (fusionPrice === "2") return "500-1000€";
  if (fusionPrice === "3") return "1000-5000€";
  if (fusionPrice === "4") return "5000-10.000€";
  if (fusionPrice === "5") return "10.000-30.000€";
  if (fusionPrice === "6") return "30.000-50.000€";
  if (fusionPrice === "7") return "50.000-100.000€";
  if (fusionPrice === "8") return "100.000€+";
  else return "";
};

export const boosterValue = (fusionPrice: string, cartBoosters: any) => {
  if (fusionPrice === "0-200€") return cartBoosters.a;
  if (fusionPrice === "200-500€") return cartBoosters.b;
  if (fusionPrice === "500-1000€") return cartBoosters.c;
  if (fusionPrice === "1000-5000€") return cartBoosters.d;
  if (fusionPrice === "5000-10.000€") return cartBoosters.e;
  if (fusionPrice === "10.000-30.000€") return cartBoosters.f;
  if (fusionPrice === "30.000-50.000€") return cartBoosters.g;
  if (fusionPrice === "50.000-100.000€") return cartBoosters.h;
  if (fusionPrice === "100.000€+") return cartBoosters.i;
};

export const boosterPercentage = (fusionPrice: string) => {
  if (fusionPrice === "0-200€") return 50;
  if (fusionPrice === "200-500€") return 40;
  if (fusionPrice === "500-1000€") return 25;
  if (fusionPrice === "1000-5000€") return 10;
  if (fusionPrice === "5000-10.000€") return 10;
  if (fusionPrice === "10.000-30.000€") return 5;
  if (fusionPrice === "30.000-50.000€") return 3;
  if (fusionPrice === "50.000-100.000€") return 2;
  if (fusionPrice === "100.000€+") return 1;
};

export const boosterCap = (fusionPrice: string) => {
  if (fusionPrice === "0-200€") return 100;
  if (fusionPrice === "200-500€") return 80;
  if (fusionPrice === "500-1000€") return 50;
  if (fusionPrice === "1000-5000€") return 40;
  if (fusionPrice === "5000-10.000€") return 20;
  if (fusionPrice === "10.000-30.000€") return 20;
  if (fusionPrice === "30.000-50.000€") return 12;
  if (fusionPrice === "50.000-100.000€") return 8;
  if (fusionPrice === "100.000€+") return 6;
};



export const newWatchProduction = (id: string) => {
  return {
    id,
    polishState: randomWeightedNumber([
      1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10,
    ]),
    movementState: randomWeightedNumber([
      1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10,
    ]),
    generalState: randomWeightedNumber([
      1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10,
    ]),
  };
};

export const watchTotalValue = (
  avgTotal: number,
  generalState: number,
  polishState: number,
  movementState: number
) => {
  return (
    (avgTotal * 4 + generalState * 2 + polishState + movementState) /
    8
  ).toFixed(1);
};

export const starRatingColor = (individualValue: number) => {
  switch (true) {
    case individualValue >= 4.5:
      return "red";
    case individualValue >= 4:
      return "orange";
      case individualValue >= 3.5:
        return "purple";
    case individualValue >= 3:
      return "green";
    case individualValue >= 2:
      return "white";
    default:
      return "#ffffff66";
  }
};

export const individualRating = (
  generalState: number,
  polishState: number,
  movementState: number
) => {
  const value = ((generalState + polishState + movementState) / 6).toFixed(1);
  return Number(value);
};

export const shredderMeter = (data:string[]) => {
  let a = 0;
  for (let i = 0; i < data.length; i++) {
    a = a + 1 + parseInt(data[i][0]);
  }
  return a;
};

export const arrangeFusion = (watchParts:string[]) => {
  const oldArray = [...watchParts];
  const newArray = Array(9) as any;

  for (let i = 0; i < oldArray.length; i++) {
    const checkIfExist = () => {
      if (newArray[Array.from(oldArray[i])[0]]) {
        if (!newArray[Array.from(oldArray[i])[0]].includes(oldArray[i]))
          return [...newArray[Array.from(oldArray[i])[0]], oldArray[i]];
        else return [...newArray[Array.from(oldArray[i])[0]]];
      }
      return [oldArray[i]];
    };
    newArray.splice(Array.from(oldArray[i])[0], 1, checkIfExist());
  }

  return newArray;
};

export const numberToLetter = (pos:number) => {
  switch (pos) {
    case 0: return "a"
    case 1: return "b"
    case 2: return "c"
    case 3: return "d"
    case 4: return "e"
    case 5: return "f"
    case 6: return "g"
    case 7: return "h"
    case 8: return "i"
    default: return "a"
  }
}
