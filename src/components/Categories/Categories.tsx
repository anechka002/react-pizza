import React from 'react';

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const handleOnClickCategories = (activeIndex: number) => {
    setActiveIndex(activeIndex);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleOnClickCategories(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
