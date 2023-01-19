import { IDish } from "@/Interface/Shop";
import React from "react";

interface Props {
  dish: IDish;
}

function CategoryDish({ dish }: Props) {
  return (
    <div className="col-span-1">
      <img src={dish.images[0]} />
      <h3>{dish.name}</h3>
      <p>
        {dish.description.length > 50
          ? `${dish.description.slice(0, 50)}...`
          : dish.description}
      </p>
    </div>
  );
}

export default CategoryDish;
