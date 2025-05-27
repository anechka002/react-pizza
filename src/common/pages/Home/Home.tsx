import { selectCategoryId, selectCurrentPage, selectSearch, selectSort } from "@/app/redux/slices/filterSlice";
import { Categories, Pagination, PizzaBlock, PizzaSkeleton, Sort } from "@/common/components";
import { useAppSelector } from "@/common/hooks";
import type { PizzasType } from "@/common/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {

  const [items, setItems] = useState<PizzasType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categoryId = useAppSelector(selectCategoryId)
  const sortType = useAppSelector(selectSort)
  const searchValue = useAppSelector(selectSearch)
  const currentPage = useAppSelector(selectCurrentPage)

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'

    const params = {
    page: currentPage,
    limit: 4,
    sortBy,
    order,
    ...(categoryId > 0 && { category: categoryId }),
    ...(searchValue && { search: searchValue })
  };

    axios.get(`https://682df928746f8ca4a47b67c3.mockapi.io/items`, { params })
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

      <Pagination currentPage={currentPage}/>
    </>
  );
};
