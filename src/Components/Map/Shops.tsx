import { useShopPreviews } from "@/Hooks/useShopPreviews";
import React, { useEffect, useRef, useState } from "react";
import Divider from "../Utils/Divider";
import ShopCard from "./ShopCard";

interface Props {
  scrollTo: number;
}

function Shops({ scrollTo }: Props) {
  const shops = useShopPreviews();

  const refs = Array.from(Array(8)).reduce((acc, value, index) => {
    acc[index] = React.createRef();
    return acc;
  }, []);

  useEffect(() => {
    if (scrollTo === -1) {
      return;
    }

    refs[scrollTo]?.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [scrollTo]);

  return (
    <div className="w-1/4 z-50">
      {shops.map((shop, index) => (
        <ShopCard key={shop.name} ref={refs[index]} shop={shop} />
      ))}
    </div>
  );
}

export default Shops;
