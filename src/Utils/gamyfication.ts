import { experienceCap, rankColors, bagSize } from "src/constants/gamification";
import { getRandomInt } from "./math";

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

export const bagSizeHelper = (experience:number) => {
  switch(true) {
    case experience < experienceCap.NOOB: return bagSize.NOOB
    case experience < experienceCap.BEGGINNER: return bagSize.BEGGINNER
    case experience < experienceCap.ENTHUSIAST: return bagSize.ENTHUSIAST
    case experience < experienceCap.MATURE: return bagSize.MATURE
    case experience < experienceCap.CONNOISSEUR: return bagSize.CONOISSEUR
    case experience < experienceCap.GEEK_LEGEND: return bagSize.GEEK_LEGEND
    case experience >= experienceCap.GEEK_LEGEND: return bagSize.GOD
    default: return bagSize.NOOB
  }}

  export function getRandomWatchPart() {
    const a = getRandomInt(1, 5);
    if (a === 1) return "Case";
    if (a === 2) return "Movement";
    if (a === 3) return "Crown";
    if (a === 4) return "Glass";
    if (a === 5) return "Bracelet";
  }

  export function getRandomPart(color:string) {
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
  
 