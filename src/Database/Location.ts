import { useSupabase } from "@/Hooks/useSupabase";
import { ILocation, IShopLocation } from "@/Interface/Shop";

export const GetShopLocation = async (shopId: number): Promise<ILocation> => {
  const supabase = useSupabase();

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
  const supabase = useSupabase();

  const { data: locations, error } = await supabase.from("Shops").select("*");

  if (error) {
    return [];
  }

  return locations.map((location) => ({
    lat: location.lat,
    lng: location.lng,
    shopId: location.id,
  }));
};
