import type { SortProperty } from "../enum/enum";

export type PizzasType = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export type SortType = {
  name: string
  sortProperty: SortProperty
}

export type TypeName = 'тонкое' | 'традиционное'

export type CategoriesType = 'Все' | 'Мясные' |'Вегетарианская' | 'Гриль' | 'Острые' | 'Закрытые'

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number
  type: TypeName,
  count: number
}

export interface PizzasParams {
  search?: string;
  category?: number;
  page: number;
  limit: number;
  sortBy: string;
  order: string;
}