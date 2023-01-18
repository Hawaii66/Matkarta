export interface ILocation {
  lat: number;
  lng: number;
}

export interface IShopLocation extends ILocation {
  shopId: number;
}

export interface IIngridient {
  id: number;
  name: string;
  amount: number;
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  cost: number;
  category: string;
  ingridients: IIngridient[];
  images: string[];
}

export interface IBasicShop {
  images: string[];
  name: string;
  description: string;
}

export interface IShop extends IBasicShop, ILocation {
  id: number;
  dishes: IDish[];
  images: string[];
}
