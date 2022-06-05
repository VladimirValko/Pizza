import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import './scss/app.scss';
import Home from './pages/home';
import NotFoundPage from './pages/not-found-page.jsx';
import Cart from './pages/cart';

export const SearchContext = createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFoundPage />} />
                {/* path='*' - если нет никаких совпадений с нашими страницами */}
              </Routes>
            </div>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
