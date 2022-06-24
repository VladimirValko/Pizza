import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type PizzaType = {
    imageUrl: string,
    title: string,
    price: number,
}

const FullPizza: React.FC = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState<PizzaType>();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://629778388d77ad6f7503cbba.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                console.log(error);
                alert('Упс, что-то пошло не так..');
            }
        }
        fetchPizza();
        console.log(pizza);
    }, [])


    if(!pizza){
        return <>Загрузка....</>
    }

  return (
    <div className='content'>
        <img src={pizza.imageUrl} alt='пицца'/>
        <h2>{pizza.title}</h2>
        <h3>{pizza.price} ₽</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi recusandae veniam cum consectetur quos, asperiores fuga atque voluptate suscipit quam veritatis dicta dolore eaque distinctio itaque omnis, quae modi! Eos!</p>
    </div>
  )
}

export default FullPizza