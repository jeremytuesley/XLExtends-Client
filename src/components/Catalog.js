import React from 'react';
import { Key } from 'sshpk';
import Products from '../mockapi/products.json';

const Catalog = ({ title }) => {
  return (
    <div className="catalog">
      <h1>{title}</h1>

      <div className="catalogCards">
        {Products.map((item, key) => {
          return (
            <div>
              <img src={item.image} alt="cardThumbnail" />
              <div>{item.productName}</div>
              <div>{item.price}</div>
              <div>{item.saleprice}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
