import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import useCartModel from "../hooks/useCart";
import ProductPaymentForm from "../components/ProductPaymentForm";
import "../assets/payment.scss";

const PaymentForm = () => {
  const { cartData, setCart } = useCartModel();
  return (
    <div className="content">
      <div className="paymentPage">
        <ProductPaymentForm />
        <div className="paymentItems">
          <div className="paymentItemTitle">Order Summary</div>
          <div className="productCardsContainer">
            {cartData.map((item, key) => {
              return (
                <div key={key} className="productCards">
                  <div className="namePrice">
                    <div>{item.name}</div>
                    {!item.salePrice ? `$${item.price}` : `$${item.salePrice}`}
                  </div>
                  <div className="imageThumbnail">
                    <img src={item.images[0]} alt="itemThumbnail" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="subTotals">Totals</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
