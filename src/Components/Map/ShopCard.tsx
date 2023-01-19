import { IPreviewShop } from "@/Interface/Shop";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  shop: IPreviewShop;
}

const ShopCard = React.forwardRef<HTMLDivElement, Props>(({ shop }, ref) => {
  return (
    <div
      ref={ref}
      className="m-2 shadow bg-neutral-50 p-2 rounded cursor-pointer"
    >
      <Link href={`/shops/${shop.id}`}>
        <div>
          <img className="rounded" src={shop.images[0]} />
        </div>
        <div className="px-2">
          <div className="flex flex-row justify-between">
            <h2 className="w-full text-left font-bold text-xl text-neutral-700">
              {shop.name}
            </h2>
            <button className="flex flex-row items-center">
              <h2 className="mr-2 text-green-500 font-bold">Visit</h2>
              <AiOutlineArrowRight color={"#22c55e"} />
            </button>
          </div>
          <p className="w-full text-left font-normal text-lg text-neutral-700">
            {shop.description}
          </p>
        </div>
      </Link>
    </div>
  );
});

export default ShopCard;
