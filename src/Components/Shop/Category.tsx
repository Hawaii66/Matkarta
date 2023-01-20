import { IDishCategory } from "@/Interface/Shop";
import React, { useEffect, useState } from "react";
import CategoryDish from "./CategoryDish";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";
import SmoothCollapse from "react-smooth-collapse";

interface Props {
  dishCategory: IDishCategory;
  shopId: number;
}

function Category({ dishCategory, shopId }: Props) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="mb-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold text-neutral-700">
          {dishCategory.category}
        </h2>
        {visible ? (
          <GoTriangleDown onClick={() => setVisible(false)} />
        ) : (
          <GoTriangleRight onClick={() => setVisible(true)} />
        )}
      </div>
      <SmoothCollapse expanded={visible}>
        <div className="flex flex-col w-full">
          {dishCategory.dishes.map((dish) => (
            <CategoryDish dish={dish} shopId={shopId} />
          ))}
        </div>
      </SmoothCollapse>
    </div>
  );
}

export default Category;
