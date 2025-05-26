import { SearchContext } from "@/app/App";
import { selectCategoryId, selectSort } from "@/app/redux/slices/filterSlice";
import { Categories, Pagination, PizzaBlock, PizzaSkeleton, Sort } from "@/common/components";
import { useAppSelector } from "@/common/hooks";
import type { PizzasType } from "@/common/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export const Home = () => {
  const {searchValue} = useContext(SearchContext)
  const [items, setItems] = useState<PizzasType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1)

  const categoryId = useAppSelector(selectCategoryId)
  const sortType = useAppSelector(selectSort)

  useEffect(() => {
    setIsLoading(true);
      axios
        .get(`https://682df928746f8ca4a47b67c3.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0 ? `&category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=desc${searchValue ? `&search=${searchValue}` : ''}`)
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage]);
    
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId}/>

        <Sort value={sortType}/>
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
