import { GetDishes } from "@/Database/Dish";
import { GetShop } from "@/Database/Shop";
import supabase from "@/Database/Supabase";
import { IIngridient, IShop } from "@/Interface/Shop";

export const SaveShop = async (shop: IShop): Promise<IShop> => {
  const oldShop = await GetShop(shop.id);
  //Delete all old stuff
  const collectedIngridients = oldShop.dishes.flatMap((dish) => {
    const ings: IIngridient[] = dish.ingridients.map((ing) => ing);
    return ings;
  });
  const { error } = await supabase
    .from("Ingridients")
    .delete()
    .in(
      "id",
      collectedIngridients.map((i) => i.id)
    );
  await supabase
    .from("Dishes")
    .delete()
    .eq(
      "id",
      oldShop.dishes.map((i) => i.id)
    );

  //Insert all new stuff
  await supabase
    .from("Shops")
    .update({ description: shop.description })
    .eq("id", shop.id);

  await supabase.from("Dishes").insert(
    shop.dishes.map((dish) => ({
      category: dish.category,
      cost: dish.cost,
      description: dish.description,
      name: dish.name,
      shop: shop.id,
    }))
  );
  const newTempShop = await GetShop(shop.id);
  const collectedNewIngridients = newTempShop.dishes.flatMap((dish) => {
    const ings: { dish: number; ing: IIngridient }[] = dish.ingridients.map(
      (i) => ({
        dish: dish.id,
        ing: i,
      })
    );
    return ings;
  });
  await supabase.from("Ingridients").insert(
    collectedNewIngridients.map((i) => ({
      amount: i.ing.amount,
      dish: i.dish,
      name: i.ing.name,
    }))
  );

  const newShop = await GetShop(shop.id);

  return newShop;
};
