import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: any;
} 

const Categories:React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
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
