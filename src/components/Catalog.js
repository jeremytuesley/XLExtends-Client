import React from "react";
import Error from "./Error";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import "../assets/catalog.scss";

const Catalog = ({ title, dataResult, loading, error }) => {
  if (loading) return <Loading fullPage />;
  if (error) return <Error />;

  return (
    <div className="catalog content">
      <h1>{title}</h1>
      <div className="catalogContainer">
        {dataResult.map((item, key) => {
          return item.available ? (
            <div key={key} className="catalogCards">
              <div className="catalogCardsContainer">
                <Link
                  to={
                    item.__typename === "Product"
                      ? `/product/${item._id}`
                      : `/service/${item._id}`
                  }
                >
                  <div className="imageContainer">
                    {item.salePrice && <div className="sale">Sale</div>}
                    <img src={item.images[0]} alt="cardThumbnail" />
                  </div>
                  <div className="nameTitle">{item.name}</div>
                  <div className="prices">
                    {item.salePrice &&
                      `$${parseFloat(item.salePrice).toFixed(2)} `}
                    <div className={item.salePrice ? "price sale" : "price"}>
                      ${parseFloat(item.price).toFixed(2)}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
