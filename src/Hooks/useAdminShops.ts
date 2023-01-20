import { GetPreviewShops } from "@/Database/Shop";
import supabase from "@/Database/Supabase";
import { IPreviewShop } from "@/Interface/Shop";
import { useEffect, useState } from "react";

export const useAdminShops = (userId: string) => {
  const [shops, setShops] = useState<IPreviewShop[]>([]);

  const fetchShops = async () => {
    const { data: linkedShops, error } = await supabase
      .from("Admins")
      .select("*")
      .eq("user", userId);

    if (error || linkedShops === null) {
      return;
    }

    const shops = await GetPreviewShops(linkedShops.map((i) => i.shop));

    setShops(shops);
  };

  useEffect(() => {
    if (userId === "") {
      return;
    }

    console.log(userId);

    fetchShops();
  }, [userId]);

  return shops;
};
