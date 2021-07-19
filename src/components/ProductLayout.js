import React, { useRef } from "react";
import Customizations from "./Customizations";
import Error from "./Error";
import Loading from "./Loading";
import { useState } from "react";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "../assets/productlayout.scss";

const ProductLayout = ({ dataResult, type, loading, error }) => {
  const [activeImage, setActiveImage] = useState();
  const customRef = useRef();

  const handleCartClick = async () => {
    const options = await customRef.current.submit();
    console.log(options); // if validation pass, options will contain customizations (type Object), otherwise it's false.
    // TODO: save the product along with it's customization into localstorage
    // (search up how to save things into localstorage in react)
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
                type === "product"
                  ? "paymentButtonsContainer"
                  : "serviceButtonsContainer"
              }
            >
              {type === "product" && (
                <div className="cartButton">
                  <div
                    className="cartButtonContainer"
                    onClick={handleCartClick}
                  >
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
