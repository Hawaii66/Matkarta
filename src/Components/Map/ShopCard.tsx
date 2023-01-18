import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const ShopCard = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="m-2 shadow bg-neutral-50 p-2 rounded cursor-pointer"
    >
      <div>
        <img
          className="rounded"
          src="https://images.pexels.com/photos/1926404/pexels-photo-1926404.jpeg?auto=compress&cs=tinysrgb&w=1600"
        />
      </div>
      <div className="px-2">
        <div className="flex flex-row justify-between">
          <h2 className="w-full text-left font-bold text-xl text-neutral-700">
            Shop
          </h2>
          <button className="flex flex-row items-center">
            <h2 className="mr-2 text-green-500 font-bold">Visit</h2>
            <AiOutlineArrowRight color={"#22c55e"} />
          </button>
        </div>
        <p className="w-full text-left font-normal text-lg text-neutral-700">
          A random description with some inform,aiton about the shop
        </p>
      </div>
    </div>
  );
});

export default ShopCard;
