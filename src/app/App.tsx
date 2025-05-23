import { Header } from '@/common/components';
import './scss/app.scss';
import { Routing } from '@/common/routing';
import { useState } from 'react';

function App() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="content">
        <div className="container">
          <Routing searchValue={searchValue} />
        </div>
      </div>
    </div>
  );
}

export default App;
