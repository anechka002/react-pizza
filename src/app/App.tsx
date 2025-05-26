import { Header } from '@/common/components';
import './scss/app.scss';
import { Routing } from '@/common/routing';
import { useState } from 'react';
import React from 'react';

export const SearchContext = React.createContext<{
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}>({
  searchValue: '',
  setSearchValue: () => {},
});

function App() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header/>

        <div className="content">
          <div className="container">
            <Routing/>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
