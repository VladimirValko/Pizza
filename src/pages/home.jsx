import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Categories from '../components/categories/Categories';
import PizzaBlock from '../components/pizza-block/PizzaBlock';
import Sort from '../components/sort/Sort';
import { popUpSortList } from '../components/sort/Sort'
import qs from 'qs';
import '../scss/app.scss';
import Skeleton from '../components/skeleton/Skeleton.jsx';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCategoryId, setURLFilters } from '../redux/slices/filterSlice';

const Home = () => {
  // beckendPizzaArrayObjects это массив объектов
  const [backendPizzaArrayObjects, setBackendPizzaArrayObjects] = useState([]);
  const searchValue  = useSelector(state => state.searchReducer.searchValue);
  const [isLoading, setIsLoading] = useState(true);
  const categoryId = useSelector(state => state.filterReducer.categoryId);
  const sortType = useSelector(state => state.filterReducer.sort);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1)) // substring(1) удалит ? вначале строки
      // params это объект
      console.log(params)

      const sort = popUpSortList.find((obj) => obj.sortProp === params.sortType)
      console.log(sort)

      dispatch(setURLFilters({
        ...params,
        sort
      }))
    }
  }, []);

  useEffect(() => {
    const queryString = qs.stringify({
      sortType: sortType.sortProp,
      categoryId,
    })

    navigate(`?${queryString}`)
  }, [categoryId, sortType])

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    setIsLoading(true);
      axios.get(`https://629778388d77ad6f7503cbba.mockapi.io/items?${category}&sortBy=${sortType.sortProp}${search}`)
        .then((response) => { // response это объект в котором есть наш массив помеченный как data
          setBackendPizzaArrayObjects(response.data);
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
        <Categories categoryId={categoryId} onClickCategory={(i) => dispatch(setCategoryId(i))} />
        {/* первый i - это выход, будет индекс категории в компоненте Categories ^*/}
        <Sort />
        
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
