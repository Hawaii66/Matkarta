import { GetAllBasicShop } from "@/Database/Shop";
import { IPreviewShop } from "@/Interface/Shop";
import { useEffect, useState } from "react";

export const useShopPreviews = () => {
  const [shops, setShops] = useState<IPreviewShop[]>([]);

  const fetchShops = async () => {
    const shops = await GetAllBasicShop();

    setShops(shops);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return shops;
};
