import { useEffect, useState } from "react";
import { GetAllLocations } from "src/Database/Location";
import { IShopLocation } from "../Interface/Shop";
import { useSupabase } from "./useSupabase";

export const useLocation = () => {
  const [locations, setLocations] = useState<IShopLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    setLoading(true);
    const fetchedLocations = await GetAllLocations();
    setLocations(fetchedLocations);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return {
    locations,
    loading,
  };
};
