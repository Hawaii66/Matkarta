import { SortDishes } from "@/Functions/SortDishes";
import { IDish, IDishCategory } from "@/Interface/Shop";
import { useEffect, useState } from "react";

export const useSortDishes = (dishes: IDish[]) => {
  const [sorted, setSorted] = useState<IDishCategory[]>([]);

  useEffect(() => {
    setSorted(SortDishes(dishes));
  }, [dishes]);

  return sorted;
};
