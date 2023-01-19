import { IDish, IDishCategory } from "@/Interface/Shop";

export const SortDishes = (dishes: IDish[]): IDishCategory[] => {
  const sortedDishes = new Map<string, IDish[]>();

  dishes.forEach((dish) => {
    sortedDishes.set(dish.category, [
      ...(sortedDishes.get(dish.category) || []),
      dish,
    ]);
  });

  return Array.from(sortedDishes).map((i) => ({
    category: i[0],
    dishes: i[1],
  }));
};
