import { GetServerSideProps } from "next";
import { GetShop } from "@/Database/Shop";
import { IShop } from "@/Interface/Shop";
import React, { useEffect } from "react";
import Divider from "@/Components/Utils/Divider";
import { SortDishes } from "@/Functions/SortDishes";
import { useSortDishes } from "@/Hooks/useSortDishes";
import Category from "@/Components/Shop/Category";
import { RiArrowGoBackFill } from "react-icons/ri";
import Link from "next/link";
import Header from "@/Components/Shop/Header";
import ImageGalleryWrapper from "@/Components/Shop/ImageGalleryWrapper";

interface Props {
  shop: IShop;
}

function ShopPage({ shop }: Props) {
  const sorted = useSortDishes(shop.dishes);

  return (
    <div className="flex flex-col items-center">
      <Header
        backLink="/"
        category={shop.category}
        description={shop.description}
        title={shop.name}
      />
      <ImageGalleryWrapper images={shop.images} />
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

  console.log(shop);

  return {
    props: {
      shop,
    },
  };
};

export default ShopPage;
