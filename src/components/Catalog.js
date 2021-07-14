import React from 'react';
import Products from '../mockapi/products.json';
import '../assets/catalog.scss';

const Catalog = ({ title }) => {
  return (
    <div className="catalog content">
      <h1>{title}</h1>

      <div className="catalogContainer">
        {Products.map((item, key) => {
          return (
            <div className="catalogCards">
              <img src={item.image} alt="cardThumbnail" />
              <div className="nameTitle">{item.productName}</div>
              <div className="price">
                {item.price}
                {item.saleprice}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
