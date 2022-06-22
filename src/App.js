import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import './scss/app.scss';
import Home from './pages/home';
import NotFoundPage from './pages/not-found-page.jsx';
import Cart from './pages/cart';
import FullPizza from './pages/fullPizza';


function App() {
  return (
    <div className="App">
      <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFoundPage />} />
                {/* path='*' - если нет никаких совпадений с нашими страницами 
                  /:id - : для добавления динамического адреса id имя переменной
                  этого динамического адреса
                  вытаскиваются через useParams
                */}
              </Routes>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
