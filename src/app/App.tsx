import { Header } from '@/components/Header/Header';
import './scss/app.scss';
import { Categories } from '@/components/Categories/Categories';
import { Sort } from '@/components/Sort/Sort';
import { PizzaBlock } from '@/components/PizzaBlock/PizzaBlock';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { PizzasType } from '@/types/types';

function App() {

  const[items, setItems] = useState<PizzasType[]>([])

  useEffect(() => {
    axios.get('https://682df928746f8ca4a47b67c3.mockapi.io/items') 
      .then(response => {
        setItems(response.data)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />

            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">

            {items?.map((item) => <PizzaBlock key={item.id} pizza={item} />)}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
