import { selectCategoryId, selectCurrentPage, selectSearch, selectSort, setFilters } from "@/app/redux/slices/filterSlice";
import { Categories, Pagination, PizzaBlock, PizzaSkeleton, Sort } from "@/common/components";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import type { PizzasType } from "@/common/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import qs from "qs";
import { useNavigate } from "react-router";
import { sortList } from "@/common/components/Sort/Sort";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const [items, setItems] = useState<PizzasType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const categoryId = useAppSelector(selectCategoryId)
  const sortType = useAppSelector(selectSort)
  const searchValue = useAppSelector(selectSearch)
  const currentPage = useAppSelector(selectCurrentPage)


  const fetchPizzas = () => {
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
  }

// 2. Если изменили параметры и был первый рендер
  useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortType: sortType.sortProperty,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, currentPage])

// 1. Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const list = sortList.find((el) => el.sortProperty === params.sortType)
      dispatch(setFilters({
        currentPage: Number(params.currentPage),
        categoryId: Number(params.categoryId),
        sort: list || sortType
      }))
      isSearch.current = true
    }
  }, [])

// 3. Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {      
    window.scrollTo(0, 0)

    if(!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false

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
