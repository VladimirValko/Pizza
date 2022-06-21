import qs from 'qs';
import '../scss/app.scss';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Categories from '../components/categories/Categories';
import PizzaBlock from '../components/pizza-block/PizzaBlock';
import Sort from '../components/sort/Sort';
import { popUpSortList } from '../components/sort/Sort'
import Skeleton from '../components/skeleton/Skeleton.jsx';
import { searchSelector } from '../redux/slices/searchSlice';
import { fetchPizzasDB, pizzaDBSelector } from '../redux/slices/pizzazDBSlice';
import { filterSelector, setCategoryId, setURLFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const { pizzas, status }  = useSelector(pizzaDBSelector);
  const { categoryId, sort } = useSelector(filterSelector);
  const searchValue  = useSelector(searchSelector);
  const isSearchInURL = useRef(false);
  const isMounted = useRef(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPizzasFromDB = async () => {
    dispatch(fetchPizzasDB())
  }


  useEffect(() => {
    fetchPizzasFromDB();
  }, [categoryId, sort, searchValue]); 


  useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortType: sort.sortProp,
        categoryId,
      })
  
      navigate(`?${queryString}`)
    }

    isMounted.current = true;
  }, [categoryId, sort, navigate])


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
      }));

      isSearchInURL.current = true;
    }
  }, []);


  const pizzasArr = pizzas
    .map((pizza, i) => <PizzaBlock {...pizza} key={i + pizza.title} />);
  //[...new Array(8)] фэйковый массив с 8 undefined что бы отрендерить 8 скелетонов
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton className="skeleton" key={index} />
  ));

  
  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(i) => dispatch(setCategoryId(i))} />
        {/* первый i - это выход, будет индекс категории в компоненте Categories */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        { status === 'loading' ? skeletons : pizzasArr }
      </div>
    </>
  );
};

export default Home;
