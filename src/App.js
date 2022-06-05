import React, { useState }from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import './scss/app.scss';
import Home from './pages/home';
import NotFoundPage from './pages/not-found-page.jsx';
import Cart from './pages/cart';

function App() {
  const [searchValue, setSearchValue] = useState('')
  
  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue}/>} /> 
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* path='*' - если нет никаких совпадений с нашими страницами */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
