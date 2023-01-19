import { IDishCategory } from "@/Interface/Shop";
import React, { useState } from "react";
import CategoryDish from "./CategoryDish";
import { GoTriangleRight, GoTriangleDown } from "react-icons/go";

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
          <GoTriangleDown onClick={() => setVisible((o) => !o)} />
        ) : (
          <GoTriangleRight onClick={() => setVisible((o) => !o)} />
        )}
      </div>
      {visible && (
        <div className="grid grid-cols-2 gap-2">
          {dishCategory.dishes.map((dish) => (
            <CategoryDish dish={dish} shopId={shopId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
