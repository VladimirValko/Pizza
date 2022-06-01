import React, { useState } from 'react';

const Categories = () => {
  const [isActive, setIsActive] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  // вызывается с индексом, который потом передается в сэтСтэйт
  // сэтстэйт в свою очередь передает css класс активности
  const onClickCtegory = (index) => {
    setIsActive(index); // индекс передаетс в стэйт
  };

  return ( 
    <div>
      <div className="categories">
        <ul>
          {categories.map((categorie, i) => {
            return (
              <li
                onClick={() => onClickCtegory(i)}
                className={isActive === i ? 'active' : ''}
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
