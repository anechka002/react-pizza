import { Categories, PizzaBlock, PizzaSkeleton, Sort } from "@/common/components";
import type { PizzasType } from "@/common/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
  const [items, setItems] = useState<PizzasType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      axios
        .get('https://682df928746f8ca4a47b67c3.mockapi.io/items')
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0)
    }, []);
    
  return (
    <>
      <div className="content__top">
        <Categories />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)
          : items?.map((item) => <PizzaBlock key={item.id} pizza={item} />)}
      </div>
    </>
  );
};
