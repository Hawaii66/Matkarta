import { GetServerSideProps } from "next";
import { GetShop } from "@/Database/Shop";
import { IShop } from "@/Interface/Shop";
import React, { useEffect } from "react";
import Divider from "@/Components/Utils/Divider";
import { SortDishes } from "@/Functions/SortDishes";
import { useSortDishes } from "@/Hooks/useSortDishes";
import Category from "@/Components/Shop/Category";

interface Props {
  shop: IShop;
}

function ShopPage({ shop }: Props) {
  const sorted = useSortDishes(shop.dishes);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center my-4">
        <h1 className="text-center w-full text-2xl font-bold text-neutral-700">
          {shop.name}
        </h1>
        <Divider />
        <h3 className="text-center w-full text-lg font-bold text-neutral-700">
          {"<"}
          {shop.category}
          {">"}
        </h3>
        <p className="w-4/5 text-left text-normal font-normal text-neutral-700">
          {shop.description}
        </p>
      </div>
      <div className="w-11/12">
        {sorted.map((category) => (
          <Category dishCategory={category} shopId={shop.id} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const shop = await GetShop(parseInt(context.query.id?.toString() || ""));

  console.log(shop.dishes.map((i) => i));

  return {
    props: {
      shop,
    },
  };
};

export default ShopPage;
