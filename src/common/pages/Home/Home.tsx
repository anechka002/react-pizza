import {
  selectCategoryId,
  selectCurrentPage,
  selectSearchValue,
  selectSort,
  setFilters,
} from '@/app/redux/slices/filterSlice';
import {
  Categories,
  Pagination,
  PizzaBlock,
  PizzaSkeleton,
  Sort,
} from '@/common/components';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { sortList } from '@/common/components/Sort/Sort';
import {
  fetchPizza,
  selectPizzas,
  selectStatus,
} from '@/app/redux/slices/pizzasSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const items = useAppSelector(selectPizzas);
  const status = useAppSelector(selectStatus);


  const categoryId = useAppSelector(selectCategoryId);
  const sortType = useAppSelector(selectSort);
  const searchValue = useAppSelector(selectSearchValue);
  const currentPage = useAppSelector(selectCurrentPage);

  const fetchPizzas = () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    const params = {
      page: currentPage,
      limit: 4,
      sortBy,
      order,
      ...(categoryId > 0 && { category: categoryId }),
      ...(searchValue && { search: searchValue }),
    };

    dispatch(fetchPizza(params));

    window.scrollTo(0, 0);
  };

  // 2. Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortType: sortType.sortProperty,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // 1. Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const list = sortList.find((el) => el.sortProperty === params.sortType);
      dispatch(
        setFilters({
          currentPage: Number(params.currentPage),
          categoryId: Number(params.categoryId),
          sort: list || sortType,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // 3. Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items?.map((item) => (
    <PizzaBlock key={item.id} pizza={item} />
  ));
  const skeletons = [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} />

        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'failed' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попутку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} />
    </>
  );
};
