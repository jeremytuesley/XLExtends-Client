import React from "react";
import Error from "./Error";
import Loading from "./Loading";
import { useState } from "react";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "../assets/productlayout.scss";

const ProductLayout = ({ dataResult, type, loading, error }) => {
  const [tab, setTab] = useState();
  const handleOnClick = (clickedImage) => {
    console.log(clickedImage);
    setTab(clickedImage);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="content">
      <div className="singleProduct">
        <div className="imageContainer">
          <div className="thumbnailContainer">
            {dataResult.images.map((item, key) => {
              return (
                <img
                  className={tab === item ? "activeImage" : ""}
                  key={key}
                  src={item}
                  alt="productThumbnails"
                  onClick={() => handleOnClick(item)}
                />
              );
            })}
          </div>
          <div className="biggerImageContainer">
            <div className="biggerImage">
              <img src={tab || dataResult.images[0]} alt="enlargedthumbnail" />
            </div>
          </div>
        </div>
        <div className="productContainer">
          <div className="productHeader">
            <div className="productTitle">{dataResult.name}</div>
            <div
              className={
                dataResult.salePrice ? "productPrice sale" : "productPrice"
              }
            >
              <div className="normPrice">
                ${parseFloat(dataResult.price).toFixed(2)}
              </div>
              {dataResult.salePrice &&
                `$${parseFloat(dataResult.salePrice).toFixed(2)} `}
            </div>
          </div>
          <div className="productContent">
            <div className="productDescription">{dataResult.description}</div>
            <div
              className={
                type === "product"
                  ? "paymentButtonsContainer"
                  : "serviceButtonsContainer"
              }
            >
              {type === "product" && (
                <div className="cartButton">
                  <div className="cartButtonContainer">
                    <AddShoppingCartIcon />
                    <div>Add to cart</div>
                  </div>
                </div>
              )}
              <div className="buyButton">Proceed to payment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
