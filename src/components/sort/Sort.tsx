import React, { useState, useEffect, useRef } from 'react';
import { setSortType } from '../../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { filterSelector, filterSelectorSort } from '../../redux/slices/filterSlice' 

type PopUpSortListTipe = {
  name: string;
  sortProp: string;
}

export const popUpSortList: PopUpSortListTipe[]  = [
  { name: 'популрности', sortProp: 'rating' },
  { name: 'цене', sortProp: 'price' },
  { name: 'алфавиту', sortProp: 'title' },
];

const Sort: React.FC = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const sort = useSelector(filterSelectorSort);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (evt: any) => {
      if(!evt.path.includes(sortRef.current)){
        setShowPopUp(false)
        console.log('кликк')
      }
    }

    document.body.addEventListener('click', handleClickOutside)
    console.log('замаунтился')

    return () => { // componentWillUnmount
      document.body.removeEventListener('click', handleClickOutside)
      console.log('размаунтился')
    }
  }, [])

  function sortingFu(listItem: PopUpSortListTipe) {
    dispatch(setSortType(listItem));
    console.log(listItem)
    // listItem это объект
    setShowPopUp(!showPopUp);
  }

  return (
    <div>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setShowPopUp(!showPopUp)}>{sort.name}</span>
        </div>
        {showPopUp && (
          <div className="sort__popup">
            <ul>
              {popUpSortList.map((listItemObj, i) => {
                return (
                  <li
                    key={listItemObj.sortProp + i}
                    onClick={() => sortingFu(listItemObj)}
                    className={sort.sortProp === listItemObj.sortProp ? 'active' : ''}>
                    {listItemObj.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;
