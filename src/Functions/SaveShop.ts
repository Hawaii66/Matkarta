import { GetDishes } from "@/Database/Dish";
import { AddDishImage, DeleteDishImage } from "@/Database/Images";
import { GetIngridientsFromDish } from "@/Database/Ingridient";
import { GetShop } from "@/Database/Shop";
import supabase from "@/Database/Supabase";
import { IUpdateDishes } from "@/Interface/CRUD";
import { IDish, IIngridient, IShop } from "@/Interface/Shop";

export const SaveShop = async (
  shop: IShop,
  dishOperations: IUpdateDishes
): Promise<IShop> => {
  await supabase
    .from("Shops")
    .update({ description: shop.description })
    .eq("id", shop.id);

  if (dishOperations.addDish) {
    for (var i = 0; i < dishOperations.addDish.length; i++) {
      await AddDish(shop.id, dishOperations.addDish[i]);
    }
  }
  if (dishOperations.updateDishes) {
    for (var i = 0; i < dishOperations.updateDishes.length; i++) {
      await UpdateDish(shop.id, dishOperations.updateDishes[i]);
    }
  }
  if (dishOperations.deleteDishes) {
    for (var i = 0; i < dishOperations.deleteDishes.length; i++) {
      await DeleteDish(shop.id, dishOperations.deleteDishes[i]);
    }
  }

  if (dishOperations.createDishIngridients) {
    var length = dishOperations.createDishIngridients.length;
    for (var i = 0; i < length; i++) {
      await CreateDishIngridient(
        shop.id,
        dishOperations.createDishIngridients[i].dishId,
        dishOperations.createDishIngridients[i].ingridients
      );
    }
  }
  if (dishOperations.updateDishIngridients) {
    var length = dishOperations.updateDishIngridients.length;
    for (var i = 0; i < length; i++) {
      await UpdateDishIngridient(
        shop.id,
        dishOperations.updateDishIngridients[i].dishId,
        dishOperations.updateDishIngridients[i].ingridients
      );
    }
  }
  if (dishOperations.deleteDishIngridients) {
    var length = dishOperations.deleteDishIngridients.length;
    for (var i = 0; i < length; i++) {
      await DeleteDishIngridient(
        shop.id,
        dishOperations.deleteDishIngridients[i].dishId,
        dishOperations.deleteDishIngridients[i].ingridients
      );
    }
  }
  if (dishOperations.addImage) {
    var length = dishOperations.addImage.length;
    for (var i = 0; i < length; i++) {
      await AddDishImage(
        shop.id,
        dishOperations.addImage[i].dishId,
        dishOperations.addImage[i].image
      );
    }
  }
  if (dishOperations.deleteImage) {
    var length = dishOperations.deleteImage.length;
    for (var i = 0; i < length; i++) {
      await DeleteDishImage(
        shop.id,
        dishOperations.deleteImage[i].dishId,
        dishOperations.deleteImage[i].imageName
      );
    }
  }

  const newShop = await GetShop(shop.id);

  return newShop;
};

export const AddDish = async (shopId: number, dish: IDish): Promise<IShop> => {
  const { data: insertedDish, error } = await supabase
    .from("Dishes")
    .insert({
      category: dish.category,
      cost: dish.cost,
      description: dish.description,
      name: dish.name,
      shop: shopId,
    })
    .select("*")
    .single();
  if (error) {
    return await GetShop(shopId);
  }

  await supabase.from("Ingridients").insert(
    dish.ingridients.map((ing) => ({
      amount: ing.amount,
      dish: insertedDish.id,
      name: ing.name,
    }))
  );

  return await GetShop(shopId);
};

export const UpdateDish = async (
  shopId: number,
  dish: IDish
): Promise<IShop> => {
  await supabase
    .from("Dishes")
    .update({
      category: dish.category,
      cost: dish.cost,
      description: dish.description,
      name: dish.name,
    })
    .eq("id", dish.id);

  return await GetShop(shopId);
};

export const UpdateDishIngridient = async (
  shopId: number,
  dishId: number,
  ingridient: IIngridient
): Promise<IShop> => {
  await supabase
    .from("Ingridients")
    .update({
      amount: ingridient.amount,
      name: ingridient.name,
    })
    .eq("id", ingridient.id)
    .eq("dish", dishId);

  return await GetShop(shopId);
};

export const DeleteDishIngridient = async (
  shopId: number,
  dishId: number,
  ingId: number
) => {
  await supabase
    .from("Ingridients")
    .delete()
    .eq("id", ingId)
    .eq("dish", dishId);

  return await GetShop(shopId);
};

export const CreateDishIngridient = async (
  shopId: number,
  dishId: number,
  ingridient: IIngridient
): Promise<IShop> => {
  await supabase.from("Ingridients").insert({
    amount: ingridient.amount,
    dish: dishId,
    name: ingridient.name,
  });

  return await GetShop(shopId);
};

export const DeleteDish = async (
  shopId: number,
  dishId: number
): Promise<IShop> => {
  const ids = await GetIngridientsFromDish(dishId);
  for (var i = 0; i < ids.length; i++) {
    await DeleteDishIngridient(shopId, dishId, ids[i].id);
  }

  await supabase.from("Dishes").delete().eq("id", dishId);

  return await GetShop(shopId);
};
