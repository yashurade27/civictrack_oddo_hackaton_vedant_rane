export enum Category {
  ROADS = "ROADS",
  LIGHTING = "LIGHTING",
  WATER_SUPPLY = "WATER_SUPPLY",
  CLEANLINESS = "CLEANLINESS",
  PUBLIC_SAFETY = "PUBLIC_SAFETY",
  OBSTRUCTIONS = "OBSTRUCTIONS",
}

export const categoryLabels: Record<Category, string> = {
  [Category.ROADS]: "🛣️ Roads",
  [Category.LIGHTING]: "💡 Lighting",
  [Category.WATER_SUPPLY]: "💧 Water Supply",
  [Category.CLEANLINESS]: "🧹 Cleanliness",
  [Category.PUBLIC_SAFETY]: "🚨 Public Safety",
  [Category.OBSTRUCTIONS]: "🚧 Obstructions",
}
