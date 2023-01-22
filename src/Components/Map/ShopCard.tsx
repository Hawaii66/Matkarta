import { LoadingContext } from "@/Contexts/LoadingContext";
import { IPreviewShop } from "@/Interface/Shop";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  shop: IPreviewShop;
}

const ShopCard = React.forwardRef<HTMLDivElement, Props>(({ shop }, ref) => {
  const { setLoading } = useContext(LoadingContext);

  return (
    <div
      ref={ref}
      className="min-w-[60%] md:w-auto m-2 shadow bg-neutral-50 p-2 rounded cursor-pointer"
    >
      <Link
        onClick={() => setLoading(true)}
        className="w-full"
        href={`/shops/${shop.id}`}
      >
        <div>
          <img className="rounded" src={shop.images[0]} />
        </div>
        <div className="w-full px-2">
          <div className="w-full flex flex-row justify-between">
            <h2 className="w-full text-left font-bold text-xl text-neutral-700 mr-4">
              {shop.name}
            </h2>
            <button className="flex flex-row items-center">
              <h2 className="mr-2 text-green-500 font-bold">Visit</h2>
              <AiOutlineArrowRight color={"#22c55e"} />
            </button>
          </div>
          <p className="w-full text-left font-normal text-lg text-neutral-700">
            {shop.description.length > 50
              ? `${shop.description.slice(0, 50)}...`
              : shop.description}
          </p>
        </div>
      </Link>
    </div>
  );
});

ShopCard.displayName = "ShopCard";

export default ShopCard;
