import React, { useState, useEffect } from 'react';
import Categories from '../components/categories/Categories';
import PizzaBlock from '../components/pizza-block/PizzaBlock';
import Sort from '../components/sort/Sort';
import '../scss/app.scss';
import Skeleton from '../components/skeleton/Skeleton.jsx';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://629778388d77ad6f7503cbba.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        setItems(items);
        setIsLoading(false);
      });
    // setIsLoading(false); если поставить здесь, скелетон появится и изчезнет
    // загрузка будет идти с путым экраном, тк fetch - это асинхронный процесс
  }, []); // componentDidMount запрашивает пиццы из БД

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton className="skeleton" key={index} />)
          : items.map(
              (pizza, i) => <PizzaBlock {...pizza} key={i + pizza.title} />,
              //[...new Array(6)] фэйковый массив с 6 undefined что бы отрендерить 6 скелетонов
              // title={pizza.title} вместо этого у нас {...pizza}
              // img={pizza.imageUrl} вместо этого у нас {...pizza}
              // price={pizza.price} вместо этого у нас {...pizza}
              // sizes={pizza.sizes} вместо этого у нас {...pizza}
              // type={pizza.types} вместо этого у нас {...pizza}
            )}
      </div>
    </>
  );
};

export default Home;
