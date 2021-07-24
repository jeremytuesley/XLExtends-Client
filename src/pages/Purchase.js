import React, { useState } from "react";

import useCartModel from "../hooks/useCart";
import ProductPaymentForm from "../components/ProductPaymentForm";
import { TextField, Button } from "@material-ui/core";
import "../assets/payment.scss";
// import { useQuery } from "@apollo/client";

const Purchase = () => {
  const { cartData } = useCartModel();
  const [shipping, setShipping] = useState("true");
  const [discount, setDiscount] = useState("");

  // const {loading, data, error } = useQuery() waiting api
  const handleDiscountClick = () => {
    console.log(discount); // validation goes here
  };
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const calcTotalCost = () => {
    let subtotalCost = 0;
    let totalCost = 0;
    cartData.forEach((element) => {
      if (!element.salePrice) {
        subtotalCost = element.price + subtotalCost;
      } else {
        subtotalCost = element.salePrice + subtotalCost;
      }
      if (shipping === "true") {
        totalCost = subtotalCost + 15;
      } else {
        totalCost = subtotalCost;
      }
    });
    return { totalCost, subtotalCost };
  };

  return (
    <div className="content">
      <div className="paymentPage">
        <ProductPaymentForm setShipping={(value) => setShipping(value)} />
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
          <div className="discountContainer">
            <TextField
              className="discountField"
              name="discountCode"
              label="Discount Code"
              variant="outlined"
              onChange={handleDiscountChange}
              value={discount}
            />
            <Button
              className="applyButton"
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleDiscountClick}
            >
              Apply
            </Button>
          </div>
          <div className="priceContainer">
            <div className="priceDetailContainer subtotalTop">
              <div>Sub-total</div>
              <div>${calcTotalCost().subtotalCost}</div>
            </div>
            <div className="priceDetailContainer">
              <div>Shipping</div>
              {shipping === "true" ? <div>$15</div> : <div>$0</div>}
            </div>
          </div>
          <div className="totalPriceContainer">
            <div>Total</div>
            <div>AUD${calcTotalCost().totalCost}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
