import React, { useState, useEffect } from 'react';
import Categories from '../components/categories/Categories';
import PizzaBlock from '../components/pizza-block/PizzaBlock';
import Sort from '../components/sort/Sort';
import '../scss/app.scss';
import Skeleton from '../components/skeleton/Skeleton.jsx';

const Home = ({ searchValue }) => {
  // beckendPizzaArrayObjects это массив объектов
  const [backendPizzaArrayObjects, setBackendPizzaArrayObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProp: 'rating',
  });

  useEffect(() => {
    // searchValue приходит из пропсов в виде строки и уходит в запрос на бэк
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    setIsLoading(true);
    fetch(
      `https://629778388d77ad6f7503cbba.mockapi.io/items?${category}&sortBy=${sortType.sortProp}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        setBackendPizzaArrayObjects(items);
        setIsLoading(false);
      });
    // setIsLoading(false); если поставить здесь, скелетон появится и изчезнет
    // загрузка будет идти с путым экраном, тк fetch - это асинхронный процесс
  }, [categoryId, sortType, searchValue]); 

  const pizzas = backendPizzaArrayObjects
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true; // т.е. будем перебирать уже новый .filterED массив через .map((pizza, i) => итд
    //   } else {
    //     return false;
    //   } // т.е. оставляем пришедший массив backendPizzaArrayObjects без изменений
    // })
    .map((pizza, i) => <PizzaBlock {...pizza} key={i + pizza.title} />);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton className="skeleton" key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        {/* первый i - это выход, будет индекс категории в компоненте Categories ^*/}
        <Sort value={sortType} onClickSortType={(value) => setSortType(value)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : pizzas
          //[...new Array(6)] фэйковый массив с 6 undefined что бы отрендерить 6 скелетонов
          // title={pizza.title} вместо этого у нас {...pizza}
          // img={pizza.imageUrl} вместо этого у нас {...pizza}
          // price={pizza.price} вместо этого у нас {...pizza}
          // sizes={pizza.sizes} вместо этого у нас {...pizza}
          // type={pizza.types} вместо этого у нас {...pizza}
        }
      </div>
    </>
  );
};

export default Home;
