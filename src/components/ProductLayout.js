import React, { useRef } from "react";
import Customizations from "./Customizations";
import Error from "./Error";
import Loading from "./Loading";
import { useState } from "react";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "../assets/productlayout.scss";

const ProductLayout = ({ dataResult, loading, error }) => {
  const [activeImage, setActiveImage] = useState();
  const customRef = useRef();

  const isProduct = dataResult?.__typename === "Product";

  const handleCartClick = async () => {
    const submittedCustomization = await customRef.current.submit();
    if (!submittedCustomization) return;
    const cartData = JSON.parse(localStorage.getItem("Cart")) || [];
    dataResult.options = submittedCustomization;
    let productAlreadyInCart = false;
    for (let index in cartData) {
      if (cartData[index]._id === dataResult._id) {
        cartData[index] = dataResult;
        productAlreadyInCart = true;
        break;
      }
    }
    !productAlreadyInCart && cartData.push(dataResult);
    localStorage.setItem("Cart", JSON.stringify(cartData));
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
                  className={activeImage === item ? "activeImage" : ""}
                  key={key}
                  src={item}
                  alt="productThumbnails"
                  onClick={() => setActiveImage(item)}
                />
              );
            })}
          </div>
          <div className="biggerImageContainer">
            <div className="biggerImage">
              <img
                src={activeImage || dataResult.images[0]}
                alt="enlargedthumbnail"
              />
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
            <div className="productDetailContainer">
              <Customizations options={dataResult.options} ref={customRef} />
              <div className="productDescription">{dataResult.description}</div>
            </div>
            <div
              className={
                isProduct
                  ? "paymentButtonsContainer"
                  : "serviceButtonsContainer"
              }
            >
              {isProduct && (
                <div className="cartButton" onClick={handleCartClick}>
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
