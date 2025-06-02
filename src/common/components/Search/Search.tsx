import s from './Search.module.scss';
import searchSvg from '../../../assets/img/search.svg';
import clearIconSvg from '../../../assets/img/close.svg';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector, useDebounce } from '@/common/hooks';
import { selectSearchValue, setSearchValue } from '@/app/redux/slices/filterSlice';

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch()

  const searchValue = useAppSelector(selectSearchValue)
  const [localValue, setLocalValue] = useState(searchValue)

  const debounceValue = useDebounce(localValue)

  useEffect(() => {
    dispatch(setSearchValue({value: debounceValue}));
  }, [debounceValue]);
  
  useEffect(() => {
    setLocalValue(searchValue);
  }, [searchValue]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleClearInput = () => {
    setLocalValue('')
    dispatch(setSearchValue({value: ''}))
    inputRef.current?.focus()
  };

  return (
    <div className={s.root}>
      <img className={s.icon} width="32" src={searchSvg} alt="Search" />
      <input
        ref={inputRef}
        value={localValue}
        onChange={handleSearch}
        className={s.search}
        placeholder="Поиск пиццы..."
      />
      {localValue && (
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
