import { IDish, IIngridient } from "./Shop";

export interface IUpdateDishes {
  deleteDishes?: number[];
  updateDishes?: IDish[];
  addDish?: IDish[];
  updateDishIngridients?: { dishId: number; ingridients: IIngridient }[];
  deleteDishIngridients?: { dishId: number; ingridients: number }[];
  createDishIngridients?: { dishId: number; ingridients: IIngridient }[];
  addImage?: { dishId: number; image: File }[];
  deleteImage?: { dishId: number; imageName: string }[];
}
