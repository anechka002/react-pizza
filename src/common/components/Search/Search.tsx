import s from './Search.module.scss';
import searchSvg from '../../../assets/img/search.svg';
import clearIconSvg from '../../../assets/img/close.svg';

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const Search = ({ searchValue, setSearchValue }: Props) => {
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearInput = () => {
    setSearchValue('');
  };

  return (
    <div className={s.root}>
      <img className={s.icon} width="32" src={searchSvg} alt="Search" />
      <input
        value={searchValue}
        onChange={handleSearch}
        className={s.search}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <img
          onClick={handleClearInput}
          className={s.close}
          width="32"
          src={clearIconSvg}
          alt="Close"
        />
      )}
    </div>
  );
};
