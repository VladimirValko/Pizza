import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addProduct, selectCartItemById } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  count: number;
};


const PizzaBlock:React.FC<PizzaBlockProps> = ({ id, imageUrl, title, price, sizes, types, count }) => {
  const typeNames = ['Тонкое', 'Традиционное'];
  // что бы отрисовать называние теста пришедшее из массива в виде циффр 0 и 1
  // 0 - будет тонкое, 1 - традиционное, в соответсвии с их индексами в массиве typeNames

  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const [isActiveSize, setIsActiveSize] = useState(0);
  const [isActiveType, setIsActiveType] = useState(0);

  const dispatch = useDispatch();

  const addToCart = () => {
    const pizzaItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[isActiveType],
      sizes: sizes[isActiveSize],
      count
    };

    dispatch(addProduct(pizzaItem));
  };

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt={title} />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeIndex, i) => {
              return (
                <li
                  onClick={() => setIsActiveType(i)}
                  className={isActiveType === i ? 'active' : ''}
                  key={i + typeIndex}>
                  {typeNames[typeIndex]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((size, i) => {
              return (
                <li
                  onClick={() => setIsActiveSize(i)}
                  className={isActiveSize === i ? 'active' : ''}
                  key={title + i}>
                  {size} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div onClick={addToCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
