import { IDish } from "@/Interface/Shop";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  dish: IDish;
  shopId: number;
}

function CategoryDish({ dish, shopId }: Props) {
  const hasImage = () => {
    return dish.images.length > 0 && dish.images[0] !== "";
  };

  const hasSeccondImage = () => {
    return dish.images.length > 1 && dish.images[1] !== "";
  };

  return (
    <Link
      className="w-11/12 drop-shadow-card bg-neutral-50 p-2 rounded flex flex-col items-center mb-4"
      href={`/shops/${shopId}/${dish.id}`}
    >
      <div className="flex flex-row w-full items-center justify-between">
        <h2 className="font-bold text-neutral-500">{dish.name}</h2>
        <div className="flex flex-row items-center justify-end">
          <p className="font-bold text-green-500 mr-2">{dish.cost} kr</p>
          <AiOutlineArrowRight className="text-green-500" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        {hasImage() && (
          <img src={dish.images[0]} className="w-[48%] mr-2 rounded-lg" />
        )}
        {dish.description === "" ? (
          hasSeccondImage() ? (
            <img src={dish.images[1]} className="w-[48%] rounded-lg" />
          ) : (
            <></>
          )
        ) : (
          <p>
            {dish.description.length > (hasImage() ? 50 : 100)
              ? `${dish.description.slice(0, 50)}...`
              : dish.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export default CategoryDish;
