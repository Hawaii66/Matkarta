import EditField from "@/Components/Admin/EditField";
import Divider from "@/Components/Utils/Divider";
import { GetDishesForShop } from "@/Database/Dish";
import { GetShop } from "@/Database/Shop";
import { IsAuthedOnServer } from "@/Functions/AuthedServer";
import { SaveShop } from "@/Functions/SaveShop";
import { IDish, IShop } from "@/Interface/Shop";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Loading from "@/Components/Admin/Loading";

interface Props {
  shop: IShop;
  dishes: IDish[];
  category: string;
}

function CategoryPreview({ shop, dishes, category }: Props) {
  const router = useRouter();
  const [localShop, setLocalShop] = useState(shop);
  const [localDishes, setLocalDishes] = useState(dishes);
  const [loading, setLoading] = useState(false);
  const [newIngNames, setNewIngNames] = useState<string[]>(
    dishes.map((i) => "")
  );
  const [newIngAmount, setNewIngAmount] = useState<string[]>(
    dishes.map((i) => "")
  );
  const [description, setDescription] = useState(
    dishes.map((i) => i.description)
  );
  const [names, setNames] = useState(dishes.map((i) => i.name));
  const [cost, setCosts] = useState(dishes.map((i) => i.cost));
  const [dishImages, setDishImages] = useState(dishes.map((i) => i.images));
  const [submitedImages, setSubmitedImages] = useState<(File | null)[]>(
    dishes.map(() => null)
  );

  const addDish = async () => {
    setLoading(true);
    const newShop = await SaveShop(localShop, {
      addDish: [
        {
          category,
          cost: 0,
          description: "Beskrivning på nya maten",
          id: 0,
          images: [],
          ingridients: [],
          name: "Namn på ny mat",
        },
      ],
      createDishIngridients: [],
      deleteDishes: [],
      deleteDishIngridients: [],
      updateDishes: [],
      updateDishIngridients: [],
    });
    setLoading(false);

    setLocalShop(newShop);
    setLocalDishes(newShop.dishes.filter((i) => i.category === category));
  };

  const deleteDish = async (id: number) => {
    setLoading(true);
    const newShop = await SaveShop(localShop, {
      addDish: [],
      createDishIngridients: [],
      deleteDishes: [id],
      deleteDishIngridients: [],
      updateDishes: [],
      updateDishIngridients: [],
    });
    setLoading(false);

    setLocalShop(newShop);
    setLocalDishes(newShop.dishes.filter((i) => i.category === category));

    if (newShop.dishes.filter((i) => i.category === category).length === 0) {
      router.push(`/admin/${shop.id}`);
    }
  };

  const addIng = async (id: number, index: number) => {
    setLoading(true);
    const newShop = await SaveShop(localShop, {
      addDish: [],
      createDishIngridients: [
        {
          dishId: id,
          ingridients: {
            name: newIngNames[index],
            amount: parseInt(newIngAmount[index]),
            id: -1,
          },
        },
      ],
      deleteDishes: [],
      deleteDishIngridients: [],
      updateDishes: [],
      updateDishIngridients: [],
    });
    setLoading(false);

    setLocalShop(newShop);
    setLocalDishes(newShop.dishes.filter((i) => i.category === category));
  };

  const deleteIng = async (dishId: number, indId: number) => {
    setLoading(true);
    const newShop = await SaveShop(localShop, {
      addDish: [],
      createDishIngridients: [],
      deleteDishes: [],
      deleteDishIngridients: [
        {
          dishId: dishId,
          ingridients: indId,
        },
      ],
      updateDishes: [],
      updateDishIngridients: [],
    });
    setLoading(false);

    setLocalShop(newShop);
    setLocalDishes(newShop.dishes.filter((i) => i.category === category));
  };

  const updateDish = async (index: number) => {
    setLoading(true);
    const newShop = await SaveShop(localShop, {
      updateDishes: [
        {
          ...localDishes[index],
          description: description[index],
          name: names[index],
          cost: cost[index],
        },
      ],
    });
    setLoading(false);

    setLocalShop(newShop);
    setLocalDishes(newShop.dishes.filter((i) => i.category === category));
  };

  const addImage = async (dishId: number, index: number) => {
    if (submitedImages[index] === null) {
      return;
    }

    setLoading(true);
    const newShop = await SaveShop(localShop, {
      addImage: [
        {
          dishId: dishId,
          image: submitedImages[index] as File,
        },
      ],
    });
    setLoading(false);

    setLocalShop(newShop);
    setLocalDishes(newShop.dishes.filter((i) => i.category === category));
    setDishImages(
      newShop.dishes.filter((i) => i.category === category).map((i) => i.images)
    );
  };

  const deleteImage = async (dishId: number, path: string) => {
    const name = path.split("/").at(-1) || "";

    setLoading(true);
    const newShop = await SaveShop(localShop, {
      deleteImage: [
        {
          dishId: dishId,
          imageName: name,
        },
      ],
    });
    setLoading(false);

    setLocalShop(newShop);
    setLocalDishes(newShop.dishes.filter((i) => i.category === category));
    setDishImages(
      newShop.dishes.filter((i) => i.category === category).map((i) => i.images)
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center mb-12">
      <div className="w-11/12 md:w-1/2 flex flex-col items-center">
        <div className="relative w-full min-w-full flex flex-row justify-center">
          <h1 className="text-lg text-neutral-700 font-bold">{category}</h1>
          <Link className="absolute top-2 left-2" href={`/admin/${shop.id}`}>
            <RiArrowGoBackFill />
          </Link>
        </div>
        <Divider />
        <div className="flex flex-col w-full">
          {localDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="w-full mt-2 mb-12 p-2 drop-shadow-card bg-neutral-50 rounded flex flex-col items-center"
            >
              <div className="relative w-full min-w-full flex flex-row justify-center mb-4">
                <h1 className="text-lg text-neutral-700 font-bold">
                  Ändra denna maträtt
                </h1>
                <button
                  className="absolute top-2 right-2 bg-red-500 p-2 rounded flex flex-row items-center justify-between"
                  onClick={() => deleteDish(dish.id)}
                >
                  Radera <BsFillTrashFill />
                </button>
              </div>
              <EditField
                saveClicked={() => updateDish(index)}
                shouldSave={localDishes[index].name !== names[index]}
                title="Namn"
              >
                <input
                  className="w-full min-h-[2rem] p-2 bg-neutral-200 rounded"
                  value={names[index]}
                  onChange={(e) =>
                    setNames((old) => {
                      const oldArr = [...old];
                      oldArr[index] = e.target.value;
                      return oldArr;
                    })
                  }
                />
              </EditField>
              <div className="grid grid-cols-3 gap-1 drop-shadow-card bg-neutral-50 p-2 rounded">
                {dishImages[index].map((image) => (
                  <div className="relative col-span-1" key={image}>
                    <img src={image} className="rounded" />
                    <button
                      onClick={() => deleteImage(dish.id, image)}
                      className="absolute bottom-1 right-1 text-md font-bold text-neutral-700 p-1 rounded bg-red-500 flex items-center justify-center"
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                ))}
                <div className="grid grid-cols-3 col-span-3">
                  <input
                    type="file"
                    className="col-span-2"
                    onChange={(e) =>
                      setSubmitedImages((old) => {
                        const oldArr = [...old];
                        oldArr[index] =
                          e.target.files !== null ? e.target.files[0] : null;
                        return oldArr;
                      })
                    }
                  />
                  <button
                    className="col-span-1 col-start-3 text-md font-bold text-neutral-700 p-1 rounded bg-green-500 flex items-center justify-center"
                    onClick={() => addImage(dish.id, index)}
                  >
                    <AiFillFileAdd />
                  </button>
                </div>
              </div>
              <EditField
                saveClicked={() => updateDish(index)}
                shouldSave={
                  localDishes[index].description !== description[index]
                }
                title="Beskrivning"
              >
                <input
                  className="w-full min-h-[2rem] p-2 bg-neutral-200 rounded"
                  value={description[index]}
                  onChange={(e) =>
                    setDescription((old) => {
                      const oldArr = [...old];
                      oldArr[index] = e.target.value;
                      return oldArr;
                    })
                  }
                />
              </EditField>
              <EditField
                saveClicked={() => updateDish(index)}
                shouldSave={localDishes[index].cost !== cost[index]}
                title="Kostnad"
              >
                <input
                  className="w-full min-h-[2rem] p-2 bg-neutral-200 rounded"
                  value={cost[index].toString()}
                  onChange={(e) =>
                    setCosts((old) => {
                      const oldArr = [...old];
                      oldArr[index] =
                        e.target.value === "" ? 0 : parseInt(e.target.value);
                      return oldArr;
                    })
                  }
                />
              </EditField>
              <h2 className="text-center w-full text-lg text-neutral-700 font-bold">
                Innehåll
              </h2>
              <div className="w-full grid grid-cols-ingridients">
                <h3>Namn</h3>
                <h3>Antal</h3>
                <h3></h3>
                {dish.ingridients.map((ing, index) => (
                  <div
                    key={ing.id}
                    className={`grid grid-cols-ingridients col-span-3 p-1 ${
                      index % 2 === 0 ? "bg-neutral-200" : "bg-neutral-100"
                    }`}
                  >
                    <p className="cols-span-1 px-2">{ing.name}</p>
                    <p className="cols-span-1 col-start-2 px-2">{ing.amount}</p>
                    <button
                      onClick={() => deleteIng(dish.id, ing.id)}
                      className="text-md font-bold text-neutral-700 px-4 py-1 rounded bg-red-500 flex items-center justify-center"
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                ))}
                <div className="col-span-3 bg-neutral-700 h-[0.125rem] w-full opacity-10 mt-4 mb-2" />
                <input
                  className="col-span-1 px-2 text-neutral-700 bg-neutral-200 w-11/12"
                  placeholder="Namn"
                  value={newIngNames[index]}
                  onChange={(e) =>
                    setNewIngNames((old) => {
                      const oldArr = [...old];
                      oldArr[index] = e.target.value;
                      return oldArr;
                    })
                  }
                />
                <input
                  className="col-span-1 w-full px-2 text-neutral-700  bg-neutral-200"
                  type={"number"}
                  placeholder="Antal"
                  value={newIngAmount[index]}
                  onChange={(e) =>
                    setNewIngAmount((old) => {
                      const oldArr = [...old];
                      oldArr[index] = e.target.value;
                      return oldArr;
                    })
                  }
                />
                <span />
                <div className="col-span-3 mt-2 flex justify-center items-center">
                  <button
                    onClick={() => addIng(dish.id, index)}
                    className="px-4 rounded bg-green-500 font-bold text-lg text-neutral-700 w-3/5"
                  >
                    Lägg till innehåll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addDish}
          className="text-md font-bold text-neutral-700 px-4 py-1 rounded bg-green-500 w-2/5 mt-4"
        >
          Lägg till mat
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const authed = IsAuthedOnServer(context);
  if (!authed) {
    return {
      redirect: {
        destination: "/admin",
        permanent: true,
      },
    };
  }

  const shop = await GetShop(parseInt(context.query.id?.toString() || ""));
  const dishes = (await GetDishesForShop(shop.id)).filter(
    (i) => i.category === context.query.category?.toString() || ""
  );

  return {
    props: {
      shop,
      dishes,
      category: context.query.category?.toString() || "",
    },
  };
};

export default CategoryPreview;
