import React from "react";
import Error from "./Error";
import Loading from "./Loading";
import "../assets/productlayout.scss";

const ProductLayout = ({ dataResult, loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="content">
      <div className="singleProduct">
        <div className="imageContainer">
          <img src={dataResult.images} alt="productPhoto" />
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
            <div>{dataResult.description}</div>
            <div className="buyButton">Buy it now!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
