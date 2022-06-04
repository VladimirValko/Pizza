// import React, { useState } from 'react';

const Categories = ({ categoryId, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div>
      <div className="categories">
        <ul>
          {categories.map((categorie, i) => {
            return (
              <li
                onClick={() => onClickCategory(i)}
                className={categoryId === i ? 'active' : ''}
                key={i}>
                {categorie}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
