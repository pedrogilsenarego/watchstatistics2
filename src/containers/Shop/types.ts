export const menuButtonsTypes = {
  GENERAL: "general"
}

export type ListItems = {[key:string]:Items}

export interface Items {
  value: number;
  currency: number;
  typeCurrency: string;
}