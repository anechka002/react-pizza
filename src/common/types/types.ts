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