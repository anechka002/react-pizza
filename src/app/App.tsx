import './scss/app.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { PizzasType } from '@/types/types';
import { Categories, Header, PizzaBlock, PizzaSkeleton, Sort } from '@/components';

function App() {

  const[items, setItems] = useState<PizzasType[]>([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('https://682df928746f8ca4a47b67c3.mockapi.io/items') 
      .then(response => {
        setItems(response.data)
        setIsLoading(false)      
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

            {isLoading 
              ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i}/>) 
              : items?.map((item) => <PizzaBlock key={item.id} pizza={item} />)
            } 

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
