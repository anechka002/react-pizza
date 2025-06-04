import { setCategoryId } from "@/app/redux/slices/filterSlice";
import { useAppDispatch } from "@/common/hooks";
import type { CategoriesType } from "@/common/types";
import React from "react";

type Props = {
  value: number;
}

export const Categories = React.memo(({value}: Props) => {
  
  const categories: CategoriesType[] = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const dispatch = useAppDispatch()

  const handleOnClickCategories = (id: number) => {
    dispatch(setCategoryId({id}))
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => handleOnClickCategories(index)}
            className={value === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
})