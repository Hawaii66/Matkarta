export interface ILocation {
  lat: number;
  lng: number;
}

export interface IShopLocation extends ILocation {
  shopId: number;
  name: string;
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

export interface IPreviewShop {
  images: string[];
  name: string;
  description: string;
  category: string;
}

export interface IShop extends IPreviewShop, ILocation {
  id: number;
  dishes: IDish[];
  images: string[];
}
