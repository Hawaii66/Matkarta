import Header from "@/Components/Shop/Header";
import ImageGalleryWrapper from "@/Components/Shop/ImageGalleryWrapper";
import Ingridients from "@/Components/Shop/Ingridients";
import { GetDish } from "@/Database/Dish";
import { GetShop } from "@/Database/Shop";
import { IDish, IShop } from "@/Interface/Shop";
import { GetServerSideProps } from "next";
import React from "react";

interface Props {
  shopId: number;
  dish: IDish;
}

function DishPage({ shopId, dish }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Header
        backLink={`/shops/${shopId}`}
        category={`${dish.cost} kr`}
        description={dish.description}
        title={dish.name}
      />
      <ImageGalleryWrapper images={dish.images} />
      <Ingridients ingridients={dish.ingridients} />
      <button></button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const dish = await GetDish(parseInt(context.query.dish?.toString() || ""));

  return {
    props: {
      shopId: parseInt(context.query.id?.toString() || ""),
      dish,
    },
  };
};

export default DishPage;
