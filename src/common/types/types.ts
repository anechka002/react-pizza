export type PizzasType = {
  id: number;
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
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
}

export type TypeName = 'тонкое' | 'традиционное'

export type CartItemType = {
  id: number;
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

export type LoadingType = 'idle' | 'loading' | 'succeeded' | 'failed'