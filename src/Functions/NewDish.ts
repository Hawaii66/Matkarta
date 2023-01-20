import { IDish } from "@/Interface/Shop";

export const GetEmptyDish = (): IDish => ({
  category: "",
  cost: 0,
  description: "Beskrivning på maten",
  id: -1,
  images: [],
  ingridients: [],
  name: "Namn",
});
