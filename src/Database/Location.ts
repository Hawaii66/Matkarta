import { useSupabase } from "@/Hooks/useSupabase";
import { ILocation, IShopLocation } from "@/Interface/Shop";
import supabase from "./Supabase";

export const GetShopLocation = async (shopId: number): Promise<ILocation> => {
  const { data: location, error } = await supabase
    .from("Shops")
    .select("*")
    .eq("id", shopId)
    .single();

  if (error) {
    return {
      lat: 0,
      lng: 0,
    };
  }

  return {
    lat: location.lat,
    lng: location.lng,
  };
};

export const GetAllLocations = async (): Promise<IShopLocation[]> => {
  const { data: locations, error } = await supabase.from("Shops").select("*");

  if (error) {
    return [];
  }

  const returns: IShopLocation[] = locations.map((location: any) => ({
    lat: location.lat,
    lng: location.lng,
    name: location.name,
    shopId: location.id,
  }));

  return returns;
};
