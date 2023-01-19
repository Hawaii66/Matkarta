import { useSupabase } from "@/Hooks/useSupabase";
import { IPreviewShop, IShop } from "@/Interface/Shop";
import { GetDishes, GetDishesForShop } from "./Dish";
import { GetPrimaryImage, GetShopImages } from "./Images";
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
      category: "",
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
    category: shop.category,
  };
};

export const GetAllBasicShop = async (): Promise<IPreviewShop[]> => {
  const { data: shops, error } = await supabase.from("Shops").select("*");

  if (error) {
    return [];
  }

  const image = await GetPrimaryImage(shops[0].id);

  return shops.map((shop) => ({
    category: shop.category,
    description: shop.description,
    images: [image],
    name: shop.name,
    id: shop.id,
  }));
};
