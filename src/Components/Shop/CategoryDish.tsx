import { IDish } from "@/Interface/Shop";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  dish: IDish;
  shopId: number;
}

function CategoryDish({ dish, shopId }: Props) {
  return (
    <Link
      className="col-span-1 shadow-2xl p-2 rounded flex flex-col items-center"
      href={`/shop/${shopId}/${dish.id}`}
    >
      <img className="rounded" src={dish.images[0]} />
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="text-xl text-neutral-700 font-bold">{dish.name}</h3>
        <AiOutlineArrowRight color={"#22c55e"} />
      </div>
      <p className="text-noraml text-neutral-700 font-normal">
        {dish.description.length > 50
          ? `${dish.description.slice(0, 50)}...`
          : dish.description}
      </p>{" "}
    </Link>
  );
}

export default CategoryDish;
