import { useSortDishes } from "@/Hooks/useSortDishes";
import { IShop } from "@/Interface/Shop";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import Divider from "../Utils/Divider";
import EditField from "./EditField";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GetEmptyDish } from "@/Functions/NewDish";
import { UpdateDishContext } from "@/Contexts/DishUpdateContext";
import { IUpdateDishes } from "@/Interface/CRUD";
import ImageEditor from "./ImageEditor";

interface Props {
  shop: IShop;
  save: (shop: IShop, options?: IUpdateDishes) => void;
}

function AdminShop({ shop, save }: Props) {
  const [description, setDescription] = useState(shop.description);
  const [category, setCategory] = useState(shop.category);
  const [dishes, setDishes] = useState(shop.dishes);
  const [newCategory, setNewCategory] = useState("");
  const sortedDishes = useSortDishes(dishes);
  const [shopImages, setShopImages] = useState(shop.images);

  const { operations, setOperations } = useContext(UpdateDishContext);

  const addCategory = () => {
    const newOperations = {
      ...operations,
      addDish: [
        ...(operations.addDish === undefined ? [] : operations.addDish),
        { ...GetEmptyDish(), category: newCategory },
      ],
    };
    setOperations(newOperations);
    save(shop, newOperations);
  };

  const localSave = (info?: IShop) => {
    save({
      ...shop,
      description: description,
      category: category,
      dishes: dishes,
      ...info,
    });
  };

  const deleteImages = (path: string) => {
    const name = path.split("/").at(-1) || "";

    save(shop, {
      removeShopImage: name,
    });
  };

  const addImage = (file: File) => {
    save(shop, {
      addShopImage: file,
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 md:w-1/2 flex flex-col items-center">
        <div className="relative w-full min-w-full flex flex-row justify-center">
          <h1 className="text-lg text-neutral-700 font-bold">{shop.name}</h1>
          <Link className="absolute top-2 left-2" href={"/admin"}>
            <RiArrowGoBackFill />
          </Link>
        </div>
        <Divider />
        <EditField
          saveClicked={localSave}
          shouldSave={shop.description !== description}
          title="Beskrivning"
        >
          <textarea
            className="w-full min-h-[8rem] p-2 bg-neutral-200 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </EditField>
        <EditField
          saveClicked={localSave}
          shouldSave={shop.category !== category}
          title="Affär kategori"
        >
          <input
            className="w-full min-h-[2rem] p-2 bg-neutral-200 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </EditField>
        <EditField
          saveClicked={localSave}
          shouldSave={useSortDishes(shop.dishes).length !== sortedDishes.length}
          title="Mat kategorier"
        >
          {sortedDishes.map((category) => (
            <Link
              key={category.category}
              href={`/admin/${shop.id}/category/${encodeURI(
                category.category
              )}`}
              className="flex flex-row w-full justify-between mb-2"
            >
              <h1 className="text-lg font-bold text-neutral-700">
                {category.category}
              </h1>
              <AiOutlineArrowRight className="text-lg" />
            </Link>
          ))}
          <div className="flex flex-row w-full items-center justify-between">
            <input
              className="w-full min-h-[1.25rem] p-2 bg-neutral-200 rounded text-lg"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder={"Lägg till kategori"}
            />
            <button onClick={addCategory}>
              <AiOutlineArrowRight className="text-lg ml-2" />
            </button>
          </div>
        </EditField>
        <ImageEditor
          addImage={(_, file) => addImage(file)}
          deleteImage={(_, path) => deleteImages(path)}
          dishId={0}
          dishImages={[shopImages]}
          index={0}
        />
      </div>
    </div>
  );
}

export default AdminShop;
