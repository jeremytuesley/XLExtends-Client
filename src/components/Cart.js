import React from "react";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import useCartModel from "../hooks/useCart";

import "../assets/cart.scss";

const Cart = () => {
  const { cartData, setCart } = useCartModel();

  const calcTotalCost = () => {
    let totalCost = 0;
    cartData.forEach((element) => {
      if (!element.salePrice) {
        totalCost = element.price + totalCost;
      } else {
        totalCost = element.salePrice + totalCost;
      }
    });
    return totalCost;
  };

  const handleDeleteClick = (key) => {
    cartData.splice(key, 1);
    setCart([...cartData]);
  };

  return (
    <div className="cartContainer">
      <div className="cartContents">
        <div className="cartTop">
          <div className="cartTitle">My Cart</div>
          <div className="cartQty">{cartData.length} Items</div>
        </div>
        {cartData.length === 0 ? (
          <div className="emptyCart">
            Your Cart is empty
            <div>
              <SentimentVeryDissatisfiedIcon />
            </div>
          </div>
        ) : (
          <div className="productCardContainer">
            {cartData.map((item, key) => {
              return (
                <div key={key} className="productCard">
                  <div className="productImage">
                    <img src={item.images[0]} alt="cardThumbnail" />
                  </div>
                  <div className="productDetailContainer">
                    <div className="productTextContainer">
                      <Link to={`/product/${item._id}`}>
                        <div className="productName">{item.name}</div>
                      </Link>
                      <div className="productDesc">
                        {item.customChoices && (
                          <div className="customizationContainer">
                            <div className="customizationTitle">
                              Customizations
                            </div>
                            <div>
                              {item.customChoices.color && (
                                <div>
                                  Colours -{" "}
                                  {item.customChoices.color.join(", ")}
                                </div>
                              )}
                              {item.customChoices.theme && (
                                <div>Theme - {item.customChoices.theme}</div>
                              )}
                              {item.customChoices.text && (
                                <div>Comments - {item.customChoices.text}</div>
                              )}
                            </div>
                          </div>
                        )}
                        {item.description}
                      </div>
                    </div>
                    <div className="productNumbersContainer">
                      <div
                        className={
                          item.salePrice ? "productPrice sale" : "productPrice"
                        }
                      >
                        <div className="normPrice">
                          ${parseFloat(item.price).toFixed(2)}
                        </div>
                        {item.salePrice &&
                          `$${parseFloat(item.salePrice).toFixed(2)} `}
                      </div>
                      <DeleteOutlineIcon
                        className="delete"
                        onClick={() => handleDeleteClick(key)}
                      ></DeleteOutlineIcon>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="cartPrice">
        <div>Sub-total</div>
        <div>${calcTotalCost()}</div>
      </div>
      <div className="checkoutButton">Checkout</div>
    </div>
  );
};

export default Cart;
