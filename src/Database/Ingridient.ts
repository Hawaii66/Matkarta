import { useSupabase } from "@/Hooks/useSupabase";
import { IIngridient } from "@/Interface/Shop";

export const GetIngridient = async (
  ingridientId: number
): Promise<IIngridient> => {
  const supabase = useSupabase();

  const { data: ingridient, error } = await supabase
    .from("Ingridients")
    .select("*")
    .eq("id", ingridientId)
    .single();

  if (error) {
    return {
      amount: 0,
      id: -1,
      name: "",
    };
  }

  return {
    amount: ingridient.amount,
    id: ingridient.id,
    name: ingridient.name,
  };
};

export const GetIngridients = async (ids: number[]): Promise<IIngridient[]> => {
  const promises: Promise<IIngridient>[] = [];
  for (var i = 0; i < ids.length; i++) {
    promises.push(GetIngridient(ids[i]));
  }

  const ingridients = await Promise.all(promises);

  return ingridients;
};

export const GetIngridientsFromDish = async (
  dishId: number
): Promise<IIngridient[]> => {
  const supabase = useSupabase();

  const { data: ingridients, error } = await supabase
    .from("Ingridients")
    .select("*")
    .eq("dish", dishId);

  if (error) {
    return [];
  }

  return GetIngridients(ingridients.map((i) => i.id));
};
