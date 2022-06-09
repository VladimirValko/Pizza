import React, { useContext } from 'react';
import styles from './search.module.scss';
import { useSelector } from 'react-redux';
// import setSearchValue from '../../redux/slices/'
import { SearchContext } from '../../App';
// import { SearchContext } нужен так как мы это объект нигде не прокидываем
// он есть только в App

const Search = () => {

  const { searchValue, setSearchValue } = useContext(SearchContext)
  // SearchContext приходит из App это createContext
  // а в нем лежит  <SearchContext.Provider value={{searchValue, setSearchValue}}>

  return (
    <div className={styles.root}>
      <input
        value={searchValue} // контролируемый ИНПУТ
        onChange={(e) => setSearchValue(e.target.value)}
        // запихиваем введенные в инпут данные в searchValue
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      <svg
        className={styles.searchIcon}
        fill="#000000"
        viewBox="0 0 24 24"
        width="24px"
        height="24px">
        <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
      </svg>
        {/* условный рендер крестика для очистки инпута */}
      {searchValue && (
        <svg 
          className={styles.closeIcon}
          onClick={() => setSearchValue('')}
          fill="#000000"
          viewBox="0 0 24 24"
          width="24px"
          height="24px">
          <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
