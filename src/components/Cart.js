import React from "react";

import "../assets/cart.scss";

const Cart = (pos) => {
  return (
    <div className="Cart">
      <div className="cartTop">
        <div className="cartTitle">My Cart</div>
        <div className="cartQty">Total Number of items</div>
        <div className="cartPrice">Total Cart Price</div>
      </div>
      <div className="productCard">
        <div className="productImage"></div>
        <div className="productTextContainer">
          <div className="productName">IaMaName</div>
          <div className="productDesc">IaMaDescription</div>
        </div>
        <div className="productNumbersContainer">
          <div>Price</div>
          <div>Qty</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
