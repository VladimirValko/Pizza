import React from 'react';
import styles from './not-found.module.scss';
import img from '../../assets/img/404.jpg'

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ничюго не найденo_0</h1>
      <br/>
      <span className={styles.description}><p>К сожалению такая страница отсутствует в нашем интернет-магазине</p></span>
      <img 
      src={img}
      alt='not-Found'
      className={styles.image} />
    </div>
  );
};

export default NotFound;
