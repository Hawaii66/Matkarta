import { IUpdateDishes } from "@/Interface/CRUD";
import { createContext } from "react";

interface ContextProps {
  operations: IUpdateDishes;
  setOperations: (e: IUpdateDishes) => void;
}

export const UpdateDishContext = createContext<ContextProps>({
  operations: {
    addDish: [],
    createDishIngridients: [],
    deleteDishes: [],
    deleteDishIngridients: [],
    updateDishes: [],
    updateDishIngridients: [],
  },
  setOperations: (e) => {},
});
