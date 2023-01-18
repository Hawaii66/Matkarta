import { useSupabase } from "@/Hooks/useSupabase";
import { IDish } from "@/Interface/Shop";
import {
  GetIngridient,
  GetIngridients,
  GetIngridientsFromDish,
} from "./Ingridient";

export const GetDish = async (dishId: number): Promise<IDish> => {
  const supabase = useSupabase();

  const { data: dish, error } = await supabase
    .from("Dishes")
    .select("*")
    .eq("id", dishId)
    .single();

  if (error) {
    return {
      category: "",
      cost: 0,
      description: "",
      id: -1,
      images: [],
      ingridients: [],
      name: "",
    };
  }

  const ingridients = await GetIngridientsFromDish(dish.id);

  return {
    category: dish.category,
    cost: dish.cost,
    description: dish.description,
    id: dish.id,
    name: dish.name,
    ingridients: ingridients,
    images: [],
  };
};

export const GetDishes = async (ids: number[]): Promise<IDish[]> => {
  const promises: Promise<IDish>[] = [];

  for (var i = 0; i < ids.length; i++) {
    promises.push(GetDish(ids[i]));
  }

  return await Promise.all(promises);
};

export const GetDishesForShop = async (shopId: number): Promise<IDish[]> => {
  const supabase = useSupabase();

  const { data: dishes, error } = await supabase
    .from("Dishes")
    .select("*")
    .eq("shop", shopId);

  if (error) {
    return [];
  }

  return await GetDishes(dishes.map((i) => i.id));
};
