import React from 'react'
import emptyCartImg from '../../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div class="content">
        <div class="container container--cart">
          <div class="cart cart--empty">
            <h2>Корзина пустая 😕</h2>
            <p>
              Вероятней всего, вы ещё не заказывали пиццу.<br/>
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCartImg} alt='emptyCart'/>
            <Link to="/" class="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default EmptyCart