type Props = {
  value: number;
  onClickCategory: (index: number) => void
}

export const Categories = ({value, onClickCategory}: Props) => {
  
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const handleOnClickCategories = (index: number) => {
    onClickCategory(index);
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
};
