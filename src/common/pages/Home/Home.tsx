import { Categories, Pagination, PizzaBlock, PizzaSkeleton, Sort } from "@/common/components";
import type { PizzasType, SortType } from "@/common/types";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  searchValue: string
}

export const Home = ({searchValue}: Props) => {
  const [items, setItems] = useState<PizzasType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [categoryId, setCategoryId] = useState<number>(0);
  const [sortType, setSortType] = useState<SortType>({name: 'популярности', sortProperty: 'rating'})

  useEffect(() => {
    setIsLoading(true);
      axios
        .get(`https://682df928746f8ca4a47b67c3.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=desc${searchValue ? `&search=${searchValue}` : ''}`)
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage]);

  // сортировка при статичном массиве
  // const pizzas = items?.filter((obj) => {
  //   if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true
  //   }
  //   return false
  // }).map((item) => <PizzaBlock key={item.id} pizza={item} />)
    
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

      <Pagination onChangePage={setCurrentPage}/>
    </>
  );
};
