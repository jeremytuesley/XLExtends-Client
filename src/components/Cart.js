import React from "react";

import "../assets/cart.scss";

const Cart = (pos) => {
  return (
    <div className="cartContainer">
      <div className="cartContents">
        <div className="cartTop">
          <div className="cartTitle">My Cart</div>
          <div className="cartQty">11 items</div>
        </div>
        <div className="productCardContainer">
          <div className="productCard">
            <div className="productImage">ImageBox</div>
            <div className="productDetailContainer">
              <div className="productTextContainer">
                <div className="productName">Valentines Flower Bear</div>
                <div className="productDesc">
                  Apples bananas Apples bananas Apples bananas Apples bananas
                  aaaaaaaaaaaaaaasasassasasasasasasassa
                </div>
              </div>
              <div className="productNumbersContainer">
                <div>$111.99</div>
                <div>Qty 11</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cartPrice">
        <div>Sub-total</div>
        <div>$ 249.99</div>
      </div>
      <div className="checkoutButton">Checkout</div>
    </div>
  );
};

export default Cart;
