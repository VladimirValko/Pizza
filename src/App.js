import Categories from './components/categories/Categories';
import Header from './components/header/Header';
import PizzaBlock from './components/pizza-block/PizzaBlock';
import Sort from './components/sort/Sort';
import './scss/app.scss';
import pizzas from './assets/pizza-json/pizza.json'

function App() {
  return (
    <div className="App">
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
              {pizzas.map((pizza, i) => {
                return <PizzaBlock {...pizza} 
                key={i}
                // title={pizza.title} вместо этого у нас {...pizza} 
                // img={pizza.imageUrl} вместо этого у нас {...pizza} 
                // price={pizza.price} вместо этого у нас {...pizza} 
                // sizes={pizza.sizes} вместо этого у нас {...pizza} 
                // type={pizza.types} вместо этого у нас {...pizza} 
                 />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
