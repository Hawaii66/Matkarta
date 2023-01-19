import { useSupabase } from "@/Hooks/useSupabase";
import { IBasicShop, IShop } from "@/Interface/Shop";
import { GetDishes, GetDishesForShop } from "./Dish";
import { GetShopLocation } from "./Location";
import supabase from "./Supabase";

export const GetShop = async (shopId: number): Promise<IShop> => {
  const { data: shop, error } = await supabase
    .from("Shops")
    .select("*")
    .eq("id", shopId)
    .single();

  if (error) {
    return {
      description: "",
      dishes: [],
      id: -1,
      images: [],
      lat: 0,
      lng: 0,
      name: "",
    };
  }

  const dishes = await GetDishesForShop(shopId);
  const location = await GetShopLocation(shopId);

  return {
    ...location,
    description: shop.description,
    dishes: dishes,
    id: shop.id,
    images: [],
    name: shop.name,
  };
};

export const GetAllBasicShop = async (): Promise<IBasicShop[]> => {
  return [];
};
