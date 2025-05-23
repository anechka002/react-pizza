import { Categories, PizzaBlock, PizzaSkeleton, Sort } from "@/common/components";
import type { PizzasType, SortType } from "@/common/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
  const [items, setItems] = useState<PizzasType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [sortType, setSortType] = useState<SortType>({name: 'популярности', sortProperty: 'rating'})

  console.log(categoryId, sortType)

  useEffect(() => {
    setIsLoading(true);
      axios
        .get(`https://682df928746f8ca4a47b67c3.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=desc`)
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0)
    }, [categoryId, sortType]);
    
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setCategoryId}/>

        <Sort value={sortType} onChangeSort={setSortType}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)
          : items?.map((item) => <PizzaBlock key={item.id} pizza={item} />)}
      </div>
    </>
  );
};
