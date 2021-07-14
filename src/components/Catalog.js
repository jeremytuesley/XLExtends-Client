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
              <div className="catalogCardsContainer">
                <div className="imageContainer">
                  {item.saleprice && <div className="sale">Sale</div>}
                  <img src={item.image} alt="cardThumbnail" />
                </div>
                <div className="nameTitle">{item.productName}</div>
                <div className="prices">
                  {item.saleprice &&
                    `$${parseFloat(item.saleprice).toFixed(2)} `}
                  <div className={item.saleprice ? 'price sale' : 'price'}>
                    ${parseFloat(item.price).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
